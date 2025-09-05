import React, { useState, useContext } from "react";
import { ScrollView, TextInput, Button, Alert, Text, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { updateProfile } from "../services/authApi";
import { useNavigation } from "@react-navigation/native";

export default function EditProfileScreen() {
  const navigation = useNavigation();
  const { user, userToken, signIn } = useContext(AuthContext);

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState("");

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateProfile(userToken, {
        name,
        email,
        password: password || undefined,
      });
      signIn({ token: userToken, user: updatedUser });
      Alert.alert("Success", "Profile updated successfully!", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-white pt-20 px-10 ">
      <Text className="text-3xl font-bold mb-6">Edit Profile</Text>

      <Text className="text-gray-700 mb-1 ml-1">Name</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-5"
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      <Text className="text-gray-700 mb-1 ml-1">Email</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-5"
        placeholder="you@example.com"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <Text className="text-gray-700 mb-1 ml-1">New Password</Text>
      <TextInput
        className="border border-gray-300 rounded-md p-3 mb-7"
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <View className="mb-2">
        <Button title="Save Changes" onPress={handleUpdate} color="#2563EB" />
      </View>
    </ScrollView>
  );
}
