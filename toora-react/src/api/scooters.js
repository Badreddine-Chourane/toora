// src/api/scooters.js
import api from '../api';

const scooterAPI = {
  list: () => api.get('/scooters'),
  get: (id) => api.get(`/scooters/${id}`),
  create: (data) => api.post('/scooters', data),
  update: (id, data, config) => api.post(`/scooters/${id}?_method=PUT`, data, config),
  delete: (id) => api.delete(`/scooters/${id}`)
};

export default scooterAPI;
