import api from '../api';

const paiementAPI = {
  create: (data) => api.post('/paiements', data),
  get: (id) => api.get(`/paiements/${id}`),
  list: () => api.get('/paiements'),
};

export default paiementAPI;