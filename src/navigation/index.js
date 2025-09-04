// src/navigation/index.js (your main navigation file)
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext, AuthProvider } from '../context/AuthContext';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';

function Routes() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) return null; // Or show Splash screen

  return (
    <NavigationContainer>
      {userToken ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function AppNavigation() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}
