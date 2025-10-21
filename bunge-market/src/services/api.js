// src/services/api.js
import axios from 'axios';

// MockAPI URL (고혁빈님한테 받아서 여기에 입력하세요!)
const API_BASE_URL = 'https://68db330023ebc87faa323a6c.mockapi.io/bunge';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 전체 상품 조회
export const getProducts = async () => {
  const response = await api.get('/products');
  return response.data;
};

// 단일 상품 조회
export const getProduct = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// 상품 등록
export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data;
};

// 상품 수정
export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data;
};

// 상품 삭제
export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};