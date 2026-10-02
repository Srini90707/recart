import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NetworkProvider } from './src/context/NetworkContext';
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext';
import { ListingsProvider } from './src/context/ListingsContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <NetworkProvider>
        <AuthProvider>
          <LocationProvider>
            <ListingsProvider>
              <FavoritesProvider>
                <StatusBar style="auto" />
                <RootNavigator />
              </FavoritesProvider>
            </ListingsProvider>
          </LocationProvider>
        </AuthProvider>
      </NetworkProvider>
    </SafeAreaProvider>
  );
}
