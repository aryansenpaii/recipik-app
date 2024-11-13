import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { ScrollView } from 'react-native-web'

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView />
    </View>
  )
}