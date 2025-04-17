// src/api/auth.js
import api from '../api';

export const login = async (email, mot_de_passe) => {
  const response = await api.post('/login', { email, mot_de_passe });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get('/me');
  return response.data;
};

export const logout = async () => {
  const response = await api.post('/logout');
  return response.data;
};
