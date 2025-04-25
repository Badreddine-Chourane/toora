import api from '../api';

const villeAPI = {
  list: () => api.get('/villes'),
  get: (id) => api.get(`/villes/${id}`),
  create: (data) => api.post('/villes', data),
  update: (id, data, config) => api.put(`/villes/${id}`, data, config),
  delete: (id) => api.delete(`/villes/${id}`)
};

export default villeAPI;