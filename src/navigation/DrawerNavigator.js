import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import AppStack from "./AppStack"; // your stack navigator
import { AuthContext } from "../context/AuthContext";
import EditProfileScreen from "../screens/EditProfileScreen";
import FavouritesScreen from "../screens/FavouritesScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { signOut, user } = useContext(AuthContext);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
    >
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: user?.photoURL || "https://i.pravatar.cc/150" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{user?.name || "User"}</Text>
        <TouchableOpacity
          className="bg-blue-600 rounded-lg px-4 py-2 mt-2 mx-5"
          onPress={() => props.navigation.navigate("EditProfile")}
        >
          <Text className="text-white text-center font-semibold">
            Edit Profile
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <DrawerItem
          label="Favourites"
          onPress={() => props.navigation.navigate("Favourites")}
        />
      </View>

      <TouchableOpacity
        className="bg-[#ff5454] rounded-lg w-90 h-14 mx-5 mt-8 p-3"
        onPress={() => {
          signOut();
          props.navigation.closeDrawer();
        }}
      >
        <Text className="font-bold text-2xl text-white text-center">
          Logout
        </Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="AppStack"
        component={AppStack}
        options={{ title: "Home" }}
      />
      <Drawer.Screen name="Favourites" component={FavouritesScreen} />
      <Drawer.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ title: "Edit Profile" }}
      />
      {/* we can Add other drawer screens if needed */}
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
