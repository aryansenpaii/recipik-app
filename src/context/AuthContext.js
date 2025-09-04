import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

// Create AuthContext with default empty values and functions
export const AuthContext = createContext({
  userToken: null,
  user: null,
  loading: true,
  signIn: async ({ token, user }) => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load token and user info from secure storage on app start
  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        const userDataString = await SecureStore.getItemAsync('userInfo');
        const userData = userDataString ? JSON.parse(userDataString) : null;
        setUserToken(token);
        setUser(userData);
      } catch (error) {
        console.error('Loading token failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  // Sign in function accepts both token and user object
  const signIn = async ({ token, user }) => {
    setUserToken(token);
    setUser(user);
    try {
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  // Sign out clears token and user info
  const signOut = async () => {
    setUserToken(null);
    setUser(null);
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userInfo');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userToken, user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
