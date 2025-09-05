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