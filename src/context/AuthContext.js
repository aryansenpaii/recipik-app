import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_URL = 'http://192.168.1.5:3000/api/auth';

export const AuthContext = createContext({
  userToken: null,
  user: null,
  loading: true,
  tokenExpired: false,
  signIn: async ({ token, user }) => {},
  signOut: async () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const loadAuthData = async () => {
      try {
        const token = await SecureStore.getItemAsync('userToken');
        if (token) {
          const res = await axios.get(`${API_URL}/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUserToken(token);
          setUser(res.data);
          setTokenExpired(false);
          await SecureStore.setItemAsync('userInfo', JSON.stringify(res.data));
        } else {
          setUserToken(null);
          setUser(null);
          setTokenExpired(false);
        }
      } catch (error) {
        // Token invalid or expired
        setUserToken(null);
        setUser(null);
        setTokenExpired(true);
        await SecureStore.deleteItemAsync('userToken');
        await SecureStore.deleteItemAsync('userInfo');
        console.error('Token validation failed:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAuthData();
  }, []);

  const signIn = async ({ token, user }) => {
    setUserToken(token);
    setUser(user);
    setTokenExpired(false);
    try {
      await SecureStore.setItemAsync('userToken', token);
      await SecureStore.setItemAsync('userInfo', JSON.stringify(user));
    } catch (error) {
      console.error('Error saving auth data:', error);
    }
  };

  const signOut = async () => {
    setUserToken(null);
    setUser(null);
    setTokenExpired(false);
    try {
      await SecureStore.deleteItemAsync('userToken');
      await SecureStore.deleteItemAsync('userInfo');
      console.log('Successfully signed out');
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ userToken, setUser,user, loading, tokenExpired, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
