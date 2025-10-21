import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://68db330023ebc87faa323a6c.mockapi.io'
});

// 리소스 이름이 'bunge'임
export const listProducts = (params = {}) => API.get('/bunge', { params }).then(r => r.data);
export const getProduct   = (id) => API.get(`/bunge/${id}`).then(r => r.data);
export const createProduct= (data) => API.post('/bunge', data).then(r => r.data);
export const updateProduct= (id, data) => API.put(`/bunge/${id}`, data).then(r => r.data);
export const deleteProduct= (id) => API.delete(`/bunge/${id}`).then(r => r.data);
