import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  ONBOARDING: '@recart_onboarding',
  USER: '@recart_user',
  FAVORITES: '@recart_favorites',
  LISTINGS: '@recart_listings',
  MESSAGES: '@recart_messages',
  LOCATION: '@recart_location',
};

class StorageService {
  async getOnboardingStatus() {
    try {
      const value = await AsyncStorage.getItem(KEYS.ONBOARDING);
      return value === 'true';
    } catch (_e) {
      return false;
    }
  }

  async setOnboardingStatus(status) {
    try {
      await AsyncStorage.setItem(KEYS.ONBOARDING, status ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }

  async getCurrentUser() {
    try {
      const user = await AsyncStorage.getItem(KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (_e) {
      return null;
    }
  }

  async saveCurrentUser(user) {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }

  async clearSession() {
    try {
      await AsyncStorage.removeItem(KEYS.USER);
    } catch (e) {
      console.error(e);
    }
  }

  async getFavorites() {
    try {
      const faves = await AsyncStorage.getItem(KEYS.FAVORITES);
      return faves ? JSON.parse(faves) : [];
    } catch (_e) {
      return [];
    }
  }

  async saveFavorites(favorites) {
    try {
      await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (e) {
      console.error(e);
    }
  }

  async getListings() {
    try {
      const listings = await AsyncStorage.getItem(KEYS.LISTINGS);
      return listings ? JSON.parse(listings) : [];
    } catch (_e) {
      return [];
    }
  }

  async saveListings(listings) {
    try {
      await AsyncStorage.setItem(KEYS.LISTINGS, JSON.stringify(listings));
    } catch (e) {
      console.error(e);
    }
  }

  async getLocation() {
    try {
      const location = await AsyncStorage.getItem(KEYS.LOCATION);
      return location ? JSON.parse(location) : null;
    } catch (_e) {
      return null;
    }
  }

  async saveLocation(location) {
    try {
      await AsyncStorage.setItem(KEYS.LOCATION, JSON.stringify(location));
    } catch (e) {
      console.error(e);
    }
  }

  // Clear all data for testing
  async clearAll() {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      console.error(e);
    }
  }
}

export default new StorageService();
