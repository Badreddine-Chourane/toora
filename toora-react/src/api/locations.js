import api from '../api';

const locationAPI = {
  list: () => api.get('/locations'),
  get: (id) => api.get(`/locations/${id}`),
  reserve: (data) => api.post('/locations', data),
  return: (id, data) => api.put(`/locations/${id}`, data),
};

export default locationAPI;