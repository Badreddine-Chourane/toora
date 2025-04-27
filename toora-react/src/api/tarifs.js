import api from '../api';

const tarifAPI = {
  list: () => api.get('/tarifs'),
  get: (id) => api.get(`/tarifs/${id}`),
  create: (data) => api.post('/tarifs', data),
  update: (id, data, config) => api.put(`/tarifs/${id}`, data, config),
  delete: (id) => api.delete(`/tarifs/${id}`)
};

export default tarifAPI;