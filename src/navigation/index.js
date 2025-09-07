import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthContext, AuthProvider } from '../context/AuthContext';
import AuthStack from './AuthStack';
import DrawerNavigator from './DrawerNavigator';

function ExpiredTokenScreen({ onLoginPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Session expired</Text>
      <Text style={styles.message}>
        Your login session has expired. Please log in again to continue using the app.
      </Text>
      <Button title="Login" onPress={onLoginPress} />
    </View>
  );
}

function Routes() {
  const { userToken, loading, tokenExpired, signOut } = useContext(AuthContext);
  const [showLoginScreen, setShowLoginScreen] = useState(false);

  if (loading) return null; // or splash screen

  if (!userToken) {
    if (tokenExpired && !showLoginScreen) {
      return (
        <ExpiredTokenScreen
          onLoginPress={() => {
            signOut();
            setShowLoginScreen(true); // switch to login screen after prompt
          }}
        />
      );
    }

    return <AuthStack />;
  }

  return <DrawerNavigator />;
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: 'red' },
  message: { fontSize: 16, textAlign: 'center', marginBottom: 30 },
});

export default function AppNavigation() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
