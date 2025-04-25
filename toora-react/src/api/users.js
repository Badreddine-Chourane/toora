import api from '../api';

const userAPI = {
  list: () => api.get('/utilisateurs'),
  get: (id) => api.get(`/utilisateurs/${id}`),
  create: (data) => api.post('/utilisateurs', data),
  update: (id, data, config) => api.put(`/utilisateurs/${id}`, data, config),
  delete: (id) => api.delete(`/utilisateurs/${id}`)
};

export default userAPI;