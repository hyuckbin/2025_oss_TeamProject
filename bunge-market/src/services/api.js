// src/services/api.js
import axios from 'axios';

// MockAPI URL (고혁빈님한테 받아서 여기에 입력하세요!)
const API_BASE_URL = 'https://68db330023ebc87faa323a6c.mockapi.io';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 전체 상품 조회
export const getbunge = async () => {
  const response = await api.get('/bunge');
  return response.data;
};

// 단일 상품 조회
export const getProduct = async (id) => {
  const response = await api.get(`/bunge/${id}`);
  return response.data;
};

// 상품 등록
export const createProduct = async (productData) => {
  const response = await api.post('/bunge', productData);
  return response.data;
};

// 상품 수정
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/bunge/${id}`, productData);
  return response.data;
};

// 상품 삭제
export const deleteProduct = async (id) => {
  const response = await api.delete(`/bunge/${id}`);
  return response.data;
};