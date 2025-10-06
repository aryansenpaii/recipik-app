import React, { useState, useContext, useCallback } from 'react';
import { View, Text } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../context/AuthContext';
import { getFavourites } from '../services/authApi';
import Favourites from '../components/Favourites';
import Loading from '../components/Loading';

const FavouritesScreen = () => {
  const { userToken } = useContext(AuthContext);
  const [favouriteRecipes, setFavouriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavouriteRecipes = async () => {
    try {
      const favIds = await getFavourites(userToken);
      const recipeDetailsPromises = favIds.map(async (id) => {
        const response = await fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const json = await response.json();
        return json.meals[0];
      });
      const recipes = await Promise.all(recipeDetailsPromises);
      setFavouriteRecipes(recipes.filter(Boolean)); // filter out nulls
    } catch (error) {
      console.error('Failed to load favourite recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (userToken) {
        setLoading(true);
        fetchFavouriteRecipes();
      }
      
      return () => {};
    }, [userToken])
  );

  if (loading) return <Loading />;

  if (favouriteRecipes.length === 0)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You have no favourite recipes yet.</Text>
      </View>
    );

  return <Favourites meals={favouriteRecipes} />;
};

export default FavouritesScreen;
