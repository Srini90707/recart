import * as Location from 'expo-location';
import StorageService from './StorageService';

/** Default fallback location if user denies permission or GPS is off */
export const DEFAULT_LOCATION = {
  city: 'Bengaluru',
  region: 'Karnataka',
  district: 'Bengaluru Urban',
  country: 'India',
  formatted: 'Bengaluru, Karnataka',
  latitude: 12.9716,
  longitude: 77.5946,
  isDefault: true,
};

class LocationService {
  /**
   * Check if location permission is granted
   * @returns {Promise<boolean>}
   */
  async hasPermission() {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      return status === 'granted';
    } catch (e) {
      console.warn('[LocationService] hasPermission error:', e);
      return false;
    }
  }

  /**
   * Request foreground location permission
   * @returns {Promise<boolean>}
   */
  async requestPermission() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === 'granted';
    } catch (e) {
      console.warn('[LocationService] requestPermission error:', e);
      return false;
    }
  }

  /**
   * Fetch current GPS location and reverse-geocode to human-readable address
   * @param {boolean} forceRequest - If true, requests permission if not already granted
   * @returns {Promise<object>} Location object
   */
  async getCurrentLocation(forceRequest = false) {
    try {
      let isGranted = await this.hasPermission();

      if (!isGranted && forceRequest) {
        isGranted = await this.requestPermission();
      }

      if (!isGranted) {
        // Check if previously stored location exists
        const cached = await StorageService.getLocation();
        return cached || DEFAULT_LOCATION;
      }

      // Fetch GPS coordinates with balanced accuracy for speed and battery
      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      const { latitude, longitude } = position.coords;

      // Reverse geocode to get city, state, postal code, etc.
      const geocode = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      if (geocode && geocode.length > 0) {
        const place = geocode[0];
        const city = place.city || place.subregion || place.district || place.name || 'Unknown';
        const region = place.region || place.country || '';
        const district = place.district || place.subregion || city;
        const formatted = region ? `${city}, ${region}` : city;

        const locationData = {
          city,
          region,
          district,
          country: place.country || 'India',
          formatted,
          latitude,
          longitude,
          isDefault: false,
          updatedAt: Date.now(),
        };

        // Cache for offline/immediate startup retrieval
        await StorageService.saveLocation(locationData);
        return locationData;
      }

      const cached = await StorageService.getLocation();
      return cached || DEFAULT_LOCATION;
    } catch (e) {
      console.warn('[LocationService] getCurrentLocation error:', e);
      const cached = await StorageService.getLocation();
      return cached || DEFAULT_LOCATION;
    }
  }

  /**
   * Get cached location without waiting for GPS
   * @returns {Promise<object>}
   */
  async getCachedLocation() {
    try {
      const cached = await StorageService.getLocation();
      return cached || DEFAULT_LOCATION;
    } catch (_e) {
      return DEFAULT_LOCATION;
    }
  }
}

export default new LocationService();
