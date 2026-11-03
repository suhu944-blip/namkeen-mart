import api from './api.js';

// Public endpoints
export const getActiveProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data.data.products;
};

export const getFeaturedProducts = async () => {
  const response = await api.get('/products/featured');
  return response.data.data.products;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data.data.product;
};

export const getProductsByCategory = async (categoryId) => {
  const response = await api.get(`/products/category/${categoryId}`);
  return response.data.data.products;
};

// Admin endpoints
export const getAdminProducts = async (params = {}) => {
  const response = await api.get('/admin/products', { params });
  return response.data.data.products;
};

export const getAdminDashboardStats = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data.data.stats;
};

export const createProduct = async (productData) => {
  const response = await api.post('/products', productData);
  return response.data.data.product;
};

export const updateProduct = async (id, productData) => {
  const response = await api.put(`/products/${id}`, productData);
  return response.data.data.product;
};

export const deleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);
  return response.data;
};
