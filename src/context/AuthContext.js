import React, { createContext, useState, useEffect } from 'react';
import StorageService from '../services/StorageService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialState() {
      try {
        const onboarded = await StorageService.getOnboardingStatus();
        const currentUser = await StorageService.getCurrentUser();
        
        setHasCompletedOnboarding(onboarded);
        setUser(currentUser);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    loadInitialState();
  }, []);

  const login = async (userData) => {
    await StorageService.saveCurrentUser(userData);
    setUser(userData);
  };

  const logout = async () => {
    await StorageService.clearSession();
    setUser(null);
  };

  const completeOnboarding = async () => {
    await StorageService.setOnboardingStatus(true);
    setHasCompletedOnboarding(true);
  };

  return (
    <AuthContext.Provider value={{
      user,
      hasCompletedOnboarding,
      isLoading,
      login,
      logout,
      completeOnboarding
    }}>
      {children}
    </AuthContext.Provider>
  );
}
