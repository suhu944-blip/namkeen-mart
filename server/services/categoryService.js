import mongoose from 'mongoose';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import { mockCategories, mockProducts } from './mockStore.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Get active categories for public storefront
 */
export const getActiveCategories = async () => {
  if (isMongoConnected()) {
    const categories = await Category.find({ isActive: true }).sort({ createdAt: -1 });
    return categories;
  }
  return mockCategories.filter((c) => c.isActive);
};

/**
 * Get all categories (active & inactive) for admin panel with product counts
 */
export const getAllCategoriesAdmin = async () => {
  if (isMongoConnected()) {
    const categories = await Category.find().sort({ createdAt: -1 });
    return await Promise.all(
      categories.map(async (cat) => {
        const count = await Product.countDocuments({ category: cat._id });
        return {
          ...cat.toObject(),
          productCount: count,
        };
      })
    );
  }

  return mockCategories.map((cat) => {
    const count = mockProducts.filter((p) => {
      const catId = p.category?._id ? p.category._id.toString() : p.category?.toString();
      return catId === cat._id.toString();
    }).length;
    return {
      ...cat,
      productCount: count,
    };
  });
};

/**
 * Get single category by ID
 */
export const getCategoryById = async (id) => {
  if (isMongoConnected()) {
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }
    return category;
  }

  const category = mockCategories.find((c) => c._id.toString() === id.toString());
  if (!category) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }
  return category;
};

/**
 * Create a new category
 */
export const createCategory = async ({ name, description, image, isActive }) => {
  if (!name || !name.trim()) {
    const error = new Error('Category name is required');
    error.statusCode = 400;
    throw error;
  }

  const trimmedName = name.trim();

  if (isMongoConnected()) {
    const existing = await Category.findOne({
      name: { $regex: new RegExp(`^${trimmedName}$`, 'i') },
    });
    if (existing) {
      const error = new Error(`Category "${name}" already exists`);
      error.statusCode = 400;
      throw error;
    }

    const category = await Category.create({
      name: trimmedName,
      description: description ? description.trim() : '',
      image: image || undefined,
      isActive: isActive !== undefined ? isActive : true,
    });
    return category;
  }

  // Fallback in-memory
  const existing = mockCategories.find(
    (c) => c.name.toLowerCase() === trimmedName.toLowerCase()
  );
  if (existing) {
    const error = new Error(`Category "${name}" already exists`);
    error.statusCode = 400;
    throw error;
  }

  const newCategory = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: trimmedName,
    description: description ? description.trim() : '',
    image: image || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
    isActive: isActive !== undefined ? isActive : true,
    createdAt: new Date(),
  };

  mockCategories.unshift(newCategory);
  return newCategory;
};

/**
 * Update an existing category
 */
export const updateCategory = async (id, updateData) => {
  if (isMongoConnected()) {
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }

    if (updateData.name && updateData.name.trim() !== category.name) {
      const duplicate = await Category.findOne({
        _id: { $ne: id },
        name: { $regex: new RegExp(`^${updateData.name.trim()}$`, 'i') },
      });
      if (duplicate) {
        const error = new Error(`Category name "${updateData.name}" is already taken`);
        error.statusCode = 400;
        throw error;
      }
      category.name = updateData.name.trim();
    }

    if (updateData.description !== undefined) category.description = updateData.description.trim();
    if (updateData.image !== undefined) category.image = updateData.image;
    if (updateData.isActive !== undefined) category.isActive = Boolean(updateData.isActive);

    await category.save();
    return category;
  }

  // Fallback in-memory
  const categoryIndex = mockCategories.findIndex((c) => c._id.toString() === id.toString());
  if (categoryIndex === -1) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  const category = mockCategories[categoryIndex];
  if (updateData.name && updateData.name.trim().toLowerCase() !== category.name.toLowerCase()) {
    const duplicate = mockCategories.find(
      (c) =>
        c._id.toString() !== id.toString() &&
        c.name.toLowerCase() === updateData.name.trim().toLowerCase()
    );
    if (duplicate) {
      const error = new Error(`Category name "${updateData.name}" is already taken`);
      error.statusCode = 400;
      throw error;
    }
    category.name = updateData.name.trim();
  }

  if (updateData.description !== undefined) category.description = updateData.description.trim();
  if (updateData.image !== undefined) category.image = updateData.image;
  if (updateData.isActive !== undefined) category.isActive = Boolean(updateData.isActive);

  return category;
};

/**
 * Delete a category (with validation against assigned products)
 */
export const deleteCategory = async (id) => {
  if (isMongoConnected()) {
    const category = await Category.findById(id);
    if (!category) {
      const error = new Error('Category not found');
      error.statusCode = 404;
      throw error;
    }

    const assignedProductsCount = await Product.countDocuments({ category: id });
    if (assignedProductsCount > 0) {
      const error = new Error(
        `Cannot delete category "${category.name}" because ${assignedProductsCount} product(s) are assigned to it. Please reassign or delete these products first.`
      );
      error.statusCode = 400;
      throw error;
    }

    await Category.findByIdAndDelete(id);
    return { message: `Category "${category.name}" deleted successfully` };
  }

  // Fallback in-memory
  const categoryIndex = mockCategories.findIndex((c) => c._id.toString() === id.toString());
  if (categoryIndex === -1) {
    const error = new Error('Category not found');
    error.statusCode = 404;
    throw error;
  }

  const category = mockCategories[categoryIndex];
  const assignedCount = mockProducts.filter((p) => {
    const catId = p.category?._id ? p.category._id.toString() : p.category?.toString();
    return catId === id.toString();
  }).length;
  if (assignedCount > 0) {
    const error = new Error(
      `Cannot delete category "${category.name}" because ${assignedCount} product(s) are assigned to it. Please reassign or delete these products first.`
    );
    error.statusCode = 400;
    throw error;
  }

  mockCategories.splice(categoryIndex, 1);
  return { message: `Category "${category.name}" deleted successfully` };
};
