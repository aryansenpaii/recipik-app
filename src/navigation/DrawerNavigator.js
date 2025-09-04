import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import AppStack from "./AppStack";
const Drawer = createDrawerNavigator();

// Custom drawer content to add profile photo, name and logout button
function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
    >
      <View>
        {/* Profile section */}
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150" }} // Replace with dynamic user photo URL if needed
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>User Name</Text>
        </View>

        {/* You can add more drawer items here if needed */}
      </View>

      {/* Logout button */}
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
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen
        name="AppStack"
        component={AppStack}
        options={{ title: "Home" }}
      />
      {/* other drawer screens (Profile, Settings, etc) can go here */}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    padding: 20,
    alignItems: "center",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
