import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { View } from 'react-native';
import * as Network from 'expo-network';
import NoInternetScreen from '../screens/NoInternetScreen';

export const NetworkContext = createContext({
  isConnected: true,
  isInternetReachable: true,
  isOffline: false,
  isChecking: false,
  checkConnection: async () => true,
});

export function NetworkProvider({ children }) {
  const [networkState, setNetworkState] = useState(null);
  const [isOffline, setIsOffline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);

  const evaluateOffline = useCallback((state) => {
    if (!state) return false;
    // If device is not connected to mobile data or Wi-Fi
    if (state.isConnected === false) return true;
    // Explicit NONE state
    if (state.type === Network.NetworkStateType.NONE) return true;
    // Explicitly unreachable internet
    if (state.isConnected === true && state.isInternetReachable === false) return true;
    return false;
  }, []);

  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    try {
      const state = await Network.getNetworkStateAsync();
      setNetworkState(state);

      let offline = evaluateOffline(state);

      // If connected to a network, verify actual internet access
      if (!offline && state.isConnected) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3000);
          const response = await fetch('https://clients3.google.com/generate_204', {
            method: 'HEAD',
            signal: controller.signal,
            cache: 'no-store',
          });
          clearTimeout(timeoutId);
          if (!response.ok && response.status !== 204) {
            offline = true;
          }
        } catch (_fetchErr) {
          // If fetch fails or aborts, mobile data/internet is unreachable
          offline = true;
        }
      }

      setIsOffline(offline);
      return !offline;
    } catch (err) {
      console.warn('[NetworkContext] checkConnection error:', err);
      return false;
    } finally {
      setIsChecking(false);
    }
  }, [evaluateOffline]);

  // Initial check and real-time network change subscription
  useEffect(() => {
    let isMounted = true;
    let subscription = null;

    async function initNetwork() {
      try {
        const state = await Network.getNetworkStateAsync();
        if (isMounted) {
          setNetworkState(state);
          setIsOffline(evaluateOffline(state));
        }
      } catch (err) {
        console.warn('[NetworkContext] initNetwork error:', err);
      }

      try {
        subscription = Network.addNetworkStateListener((state) => {
          if (isMounted) {
            setNetworkState(state);
            setIsOffline(evaluateOffline(state));
          }
        });
      } catch (err) {
        console.warn('[NetworkContext] addNetworkStateListener error:', err);
      }
    }

    initNetwork();

    return () => {
      isMounted = false;
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      }
    };
  }, [evaluateOffline]);

  return (
    <NetworkContext.Provider
      value={{
        isConnected: networkState?.isConnected ?? true,
        isInternetReachable: networkState?.isInternetReachable ?? true,
        networkType: networkState?.type,
        isOffline,
        isChecking,
        checkConnection,
      }}
    >
      <View style={{ flex: 1 }}>
        {children}
        <NoInternetScreen
          visible={isOffline}
          onRetry={checkConnection}
          isChecking={isChecking}
        />
      </View>
    </NetworkContext.Provider>
  );
}

export function useNetwork() {
  return useContext(NetworkContext);
}
