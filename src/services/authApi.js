import axios from 'axios';

const API_URL = 'http://192.168.1.5:3000/api/auth';  

export async function login(email, password) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data; // contains { token, user }
}

export async function register(name, email, password) {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data; // contains { token, user }
}

export async function updateProfile(token, userData) {
  const response = await axios.put(
    `${API_URL}/profile`,
    userData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // Updated user info
}

const FAVOURITES_URL = `${API_URL}/user/favourites`;

export const getFavourites = async (token) => {
  const res = await axios.get(FAVOURITES_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.favourites;
};

export const addFavourite = async (token, recipeId) => {
  await axios.post(
    FAVOURITES_URL,
    { recipeId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

export const removeFavourite = async (token, recipeId) => {
  await axios.delete(`${FAVOURITES_URL}/${recipeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};