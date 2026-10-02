import React, { createContext, useState, useEffect } from 'react';
import StorageService from '../services/StorageService';

export const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      const data = await StorageService.getFavorites();
      setFavorites(data || []);
    }

    loadFavorites();
  }, []);

  const toggleFavorite = async (product) => {
    let updated;
    const exists = favorites.find(f => f.id === product.id);
    if (exists) {
      updated = favorites.filter(f => f.id !== product.id);
    } else {
      updated = [...favorites, { ...product, isFavorite: true }];
    }
    
    setFavorites(updated);
    await StorageService.saveFavorites(updated);
  };

  const isFavorite = (productId) => {
    return favorites.some(f => f.id === productId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}
