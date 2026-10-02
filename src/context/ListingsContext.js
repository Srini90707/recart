import React, { createContext, useState, useEffect } from 'react';
import StorageService from '../services/StorageService';
import { MOCK_PRODUCTS } from '../data/mockData';

export const ListingsContext = createContext();

export function ListingsProvider({ children }) {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    async function loadListings() {
      let data = await StorageService.getListings();
      const hasBrokenPlaceholders = data && data.some(item => item.image && item.image.includes('placeholder'));
      const needsFreshElectronics = data && !data.some(item => item.id === 'e1');
      const needsFreshServicesData = data && !data.some(item => item.id === '6' && item.subCategory === 'Appliance Repair');
      const needsFreshServices = data && data.length < MOCK_PRODUCTS.length;
      if (!data || data.length === 0 || hasBrokenPlaceholders || needsFreshServices || needsFreshElectronics || needsFreshServicesData) {
        data = [...MOCK_PRODUCTS];
        await StorageService.saveListings(data);
      }
      setListings(data);
    }

    loadListings();
  }, []);

  const addListing = async (newListing) => {
    const listingWithId = {
      ...newListing,
      id: Date.now().toString(),
      status: 'active',
      dateAdded: new Date().toISOString()
    };
    const updated = [listingWithId, ...listings];
    setListings(updated);
    await StorageService.saveListings(updated);
  };

  const updateListing = async (updatedListing) => {
    const updated = listings.map(l => l.id === updatedListing.id ? updatedListing : l);
    setListings(updated);
    await StorageService.saveListings(updated);
  };

  const deleteListing = async (id) => {
    const updated = listings.filter(l => l.id !== id);
    setListings(updated);
    await StorageService.saveListings(updated);
  };

  return (
    <ListingsContext.Provider value={{
      listings,
      addListing,
      updateListing,
      deleteListing
    }}>
      {children}
    </ListingsContext.Provider>
  );
}
