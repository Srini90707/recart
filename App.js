import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext';
import { ListingsProvider } from './src/context/ListingsContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
