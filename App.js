import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ListingsProvider } from './src/context/ListingsContext';
import { FavoritesProvider } from './src/context/FavoritesContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ListingsProvider>
          <FavoritesProvider>
            <StatusBar style="auto" />
            <RootNavigator />
          </FavoritesProvider>
        </ListingsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
