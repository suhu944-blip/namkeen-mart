import api from './api.js';

// Public endpoints
export const getActiveCategories = async () => {
  const response = await api.get('/categories');
  return response.data.data.categories;
};

export const getCategoryById = async (id) => {
  const response = await api.get(`/categories/${id}`);
  return response.data.data.category;
};

// Admin endpoints
export const getAdminCategories = async () => {
  const response = await api.get('/admin/categories');
  return response.data.data.categories;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/categories', categoryData);
  return response.data.data.category;
};

export const updateCategory = async (id, categoryData) => {
  const response = await api.put(`/categories/${id}`, categoryData);
  return response.data.data.category;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`/categories/${id}`);
  return response.data;
};
