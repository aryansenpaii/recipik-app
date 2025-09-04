import React, { useContext } from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppStack from './AppStack'; // your stack navigator
import { AuthContext } from '../context/AuthContext';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/150' }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Aryan Senpai</Text>
      </View>
      <DrawerItem
        label="Logout"
        onPress={() => {
          signOut();
          props.navigation.closeDrawer();
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="AppStack" component={AppStack} options={{title: 'Home'}} />
      {/* Add other drawer screens if needed */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
