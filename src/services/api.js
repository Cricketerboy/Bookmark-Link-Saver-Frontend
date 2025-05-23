// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bookmark-link-saver-backend.onrender.com/api',
});

// Automatically add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
