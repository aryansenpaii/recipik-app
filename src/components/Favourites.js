import React from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import CachedImage from "../helpers/image";

const Favourites = ({ meals }) => {
  const navigation = useNavigation();

  if (!meals || meals.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No favourite recipes yet.</Text>
      </View>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("AppStack", {
            screen: "RecipeDetail",
            params: {...item },
          })
        }
      >
        <CachedImage uri={item.strMealThumb} style={styles.image} />
        <Text style={styles.title}>
          {item.strMeal.length > 20
            ? item.strMeal.slice(0, 20) + "..."
            : item.strMeal}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Favourites</Text>
      <FlatList
        data={meals}
        renderItem={renderItem}
        keyExtractor={(item) => item.idMeal}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: "15%",
    backgroundColor: "#fff", // match your app background
  },
  screenTitle: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 15,
  },
  listContainer: {
    paddingBottom: 10,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 140,
    borderRadius: 12,
  },
  title: {
    padding: 8,
    fontSize: 14,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: "#777",
  },
});

export default Favourites;
