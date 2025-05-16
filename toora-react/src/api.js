// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Add a request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');  // Changed from 'token' to 'authToken'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;
