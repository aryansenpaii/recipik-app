import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create AuthContext with default empty values
export const AuthContext = createContext({
  userToken: null,
  loading: true,
  signIn: async (token) => {},
  signOut: async () => {}
});

// AuthProvider manages auth state and token storage
export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token from secure storage on app start
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        setUserToken(token);
      } catch (e) {
        console.error('Loading token failed:', e);
      } finally {
        setLoading(false);
      }
    };
    loadToken();
  }, []);

  // Sign in handler: save token in state and secure storage
  const signIn = async (token) => {
    setUserToken(token);
    await SecureStore.setItemAsync('userToken', token);
  };

  // Sign out handler: remove token from state and secure storage
  const signOut = async () => {
    setUserToken(null);
    await SecureStore.deleteItemAsync('userToken');
  };

  return (
    <AuthContext.Provider value={{ userToken, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
