import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import AuthStack from "./AuthStack";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailScreen";
import DrawerNavigator from "./DrawerNavigator";

const Stack = createNativeStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  );
}

function Routes() {
  const { userToken, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or a splash screen component
  }

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
