import React, { createContext, useState, useEffect, useCallback } from 'react';
import LocationService, { DEFAULT_LOCATION } from '../services/LocationService';

export const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [currentLocation, setCurrentLocation] = useState(DEFAULT_LOCATION);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  // Load cached location on mount immediately, then check permissions
  useEffect(() => {
    async function initLocation() {
      try {
        const cached = await LocationService.getCachedLocation();
        if (cached) {
          setCurrentLocation(cached);
        }
        const granted = await LocationService.hasPermission();
        setHasLocationPermission(granted);
        if (granted) {
          // If already granted, refresh in background
          const fresh = await LocationService.getCurrentLocation(false);
          if (fresh) {
            setCurrentLocation(fresh);
          }
        }
      } catch (e) {
        console.warn('[LocationContext] initLocation error:', e);
      }
    }

    initLocation();
  }, []);

  /**
   * Request location permission and obtain user's exact coordinates + city
   * @param {boolean} forcePrompt - Prompt dialog if not yet granted
   */
  const requestLocation = useCallback(async (forcePrompt = true) => {
    setLoadingLocation(true);
    try {
      const locationData = await LocationService.getCurrentLocation(forcePrompt);
      if (locationData) {
        setCurrentLocation(locationData);
      }
      const granted = await LocationService.hasPermission();
      setHasLocationPermission(granted);
      return locationData;
    } catch (e) {
      console.warn('[LocationContext] requestLocation error:', e);
      return currentLocation;
    } finally {
      setLoadingLocation(false);
    }
  }, [currentLocation]);

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        loadingLocation,
        hasLocationPermission,
        requestLocation,
        refreshLocation: () => requestLocation(false),
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
