import axios from 'axios';

const API_URL = 'http://localhost:8000/api/scooters';

export const getScooters = () => axios.get(API_URL);
export const getScooter = (id) => axios.get(`${API_URL}/${id}`);
export const createScooter = (data) => axios.post(API_URL, data);
export const updateScooter = (id, data) => axios.put(`${API_URL}/${id}`, data);
export const deleteScooter = (id) => axios.delete(`${API_URL}/${id}`);
