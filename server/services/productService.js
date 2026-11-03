import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { mockProducts, mockCategories } from './mockStore.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Helper to populate category on in-memory product
 */
const populateCategoryInMemory = (product) => {
  const catId = product.category?._id ? product.category._id.toString() : product.category?.toString();
  const cat = mockCategories.find((c) => c._id.toString() === catId);
  return {
    ...product,
    category: cat ? { _id: cat._id, name: cat.name, isActive: cat.isActive } : null,
  };
};

/**
 * Get active products for customer storefront
 */
export const getActiveProducts = async ({ search, category, sort } = {}) => {
  if (isMongoConnected()) {
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: searchRegex }, { description: searchRegex }];
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_asc') sortOption = { price: 1 };
    else if (sort === 'price_desc') sortOption = { price: -1 };
    else if (sort === 'name_asc') sortOption = { name: 1 };

    const products = await Product.find(filter)
      .populate('category', 'name isActive')
      .sort(sortOption);

    return products.filter((p) => p.category && p.category.isActive);
  }

  // Fallback in-memory
  let result = mockProducts
    .filter((p) => p.isActive)
    .map(populateCategoryInMemory)
    .filter((p) => p.category && p.category.isActive);

  if (category) {
    result = result.filter(
      (p) => p.category && p.category._id.toString() === category.toString()
    );
  }

  if (search && search.trim()) {
    const s = search.trim().toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
    );
  }

  if (sort === 'price_asc') {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === 'price_desc') {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === 'name_asc') {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  return result;
};

/**
 * Get featured products for customer home page
 */
export const getFeaturedProducts = async () => {
  if (isMongoConnected()) {
    const products = await Product.find({ isActive: true, isFeatured: true })
      .populate('category', 'name isActive')
      .sort({ createdAt: -1 })
      .limit(8);

    return products.filter((p) => p.category && p.category.isActive);
  }

  return mockProducts
    .filter((p) => p.isActive && p.isFeatured)
    .map(populateCategoryInMemory)
    .filter((p) => p.category && p.category.isActive)
    .slice(0, 8);
};

/**
 * Get active products by category ID
 */
export const getProductsByCategoryId = async (categoryId) => {
  if (isMongoConnected()) {
    const products = await Product.find({
      category: categoryId,
      isActive: true,
    })
      .populate('category', 'name isActive')
      .sort({ createdAt: -1 });

    return products;
  }

  return mockProducts
    .filter((p) => {
      const catId = p.category?._id ? p.category._id.toString() : p.category?.toString();
      return p.isActive && catId === categoryId.toString();
    })
    .map(populateCategoryInMemory);
};

/**
 * Get single product by ID
 */
export const getProductById = async (id) => {
  if (isMongoConnected()) {
    const product = await Product.findById(id).populate('category', 'name description isActive');
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }
    return product;
  }

  const p = mockProducts.find((item) => item._id.toString() === id.toString());
  if (!p) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }
  return populateCategoryInMemory(p);
};

/**
 * Get all products (active & inactive) for admin panel
 */
export const getAllProductsAdmin = async ({ search, category } = {}) => {
  if (isMongoConnected()) {
    const filter = {};
    if (category && category !== 'all') filter.category = category;
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      filter.$or = [{ name: searchRegex }, { description: searchRegex }];
    }
    const products = await Product.find(filter)
      .populate('category', 'name')
      .sort({ createdAt: -1 });
    return products;
  }

  let result = mockProducts.map(populateCategoryInMemory);

  if (category && category !== 'all') {
    result = result.filter(
      (p) => p.category && p.category._id.toString() === category.toString()
    );
  }

  if (search && search.trim()) {
    const s = search.trim().toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(s) || p.description.toLowerCase().includes(s)
    );
  }

  result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  return result;
};

/**
 * Create a new product (Admin)
 */
export const createProduct = async (productData) => {
  const {
    name,
    description,
    category,
    image,
    price,
    stock,
    availabilityStatus,
    isFeatured,
    isActive,
  } = productData;

  if (!name || !description || !category || price === undefined || stock === undefined) {
    const error = new Error('Please provide name, description, category, price, and stock');
    error.statusCode = 400;
    throw error;
  }

  if (isMongoConnected()) {
    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      const error = new Error('Selected category does not exist');
      error.statusCode = 400;
      throw error;
    }

    const product = await Product.create({
      name: name.trim(),
      description: description.trim(),
      category,
      image: image || undefined,
      price: Number(price),
      stock: Number(stock),
      availabilityStatus:
        availabilityStatus || (Number(stock) > 0 ? 'in_stock' : 'out_of_stock'),
      isFeatured: Boolean(isFeatured),
      isActive: isActive !== undefined ? Boolean(isActive) : true,
    });

    return await product.populate('category', 'name');
  }

  // Fallback in-memory
  const categoryExists = mockCategories.find((c) => c._id.toString() === category.toString());
  if (!categoryExists) {
    const error = new Error('Selected category does not exist');
    error.statusCode = 400;
    throw error;
  }

  const newProduct = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: name.trim(),
    description: description.trim(),
    category: category.toString(),
    image: image || 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
    price: Number(price),
    stock: Number(stock),
    availabilityStatus:
      availabilityStatus || (Number(stock) > 0 ? 'in_stock' : 'out_of_stock'),
    isFeatured: Boolean(isFeatured),
    isActive: isActive !== undefined ? Boolean(isActive) : true,
    createdAt: new Date(),
  };

  mockProducts.unshift(newProduct);
  return populateCategoryInMemory(newProduct);
};

/**
 * Update an existing product (Admin)
 */
export const updateProduct = async (id, updateData) => {
  if (isMongoConnected()) {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    if (updateData.category && updateData.category !== product.category.toString()) {
      const categoryExists = await Category.findById(updateData.category);
      if (!categoryExists) {
        const error = new Error('Selected category does not exist');
        error.statusCode = 400;
        throw error;
      }
      product.category = updateData.category;
    }

    if (updateData.name !== undefined) product.name = updateData.name.trim();
    if (updateData.description !== undefined) product.description = updateData.description.trim();
    if (updateData.image !== undefined) product.image = updateData.image;
    if (updateData.price !== undefined) product.price = Number(updateData.price);
    if (updateData.stock !== undefined) product.stock = Number(updateData.stock);
    if (updateData.availabilityStatus !== undefined) product.availabilityStatus = updateData.availabilityStatus;
    if (updateData.isFeatured !== undefined) product.isFeatured = Boolean(updateData.isFeatured);
    if (updateData.isActive !== undefined) product.isActive = Boolean(updateData.isActive);

    if (product.stock <= 0 && product.availabilityStatus === 'in_stock') {
      product.availabilityStatus = 'out_of_stock';
    }

    await product.save();
    return await product.populate('category', 'name');
  }

  // Fallback in-memory
  const productIndex = mockProducts.findIndex((p) => p._id.toString() === id.toString());
  if (productIndex === -1) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  const product = mockProducts[productIndex];

  if (updateData.category && updateData.category !== product.category.toString()) {
    const categoryExists = mockCategories.find(
      (c) => c._id.toString() === updateData.category.toString()
    );
    if (!categoryExists) {
      const error = new Error('Selected category does not exist');
      error.statusCode = 400;
      throw error;
    }
    product.category = updateData.category.toString();
  }

  if (updateData.name !== undefined) product.name = updateData.name.trim();
  if (updateData.description !== undefined) product.description = updateData.description.trim();
  if (updateData.image !== undefined) product.image = updateData.image;
  if (updateData.price !== undefined) product.price = Number(updateData.price);
  if (updateData.stock !== undefined) product.stock = Number(updateData.stock);
  if (updateData.availabilityStatus !== undefined) product.availabilityStatus = updateData.availabilityStatus;
  if (updateData.isFeatured !== undefined) product.isFeatured = Boolean(updateData.isFeatured);
  if (updateData.isActive !== undefined) product.isActive = Boolean(updateData.isActive);

  if (product.stock <= 0 && product.availabilityStatus === 'in_stock') {
    product.availabilityStatus = 'out_of_stock';
  }

  return populateCategoryInMemory(product);
};

/**
 * Delete product by ID (Admin)
 */
export const deleteProduct = async (id) => {
  if (isMongoConnected()) {
    const product = await Product.findById(id);
    if (!product) {
      const error = new Error('Product not found');
      error.statusCode = 404;
      throw error;
    }

    await Product.findByIdAndDelete(id);
    return { message: `Product "${product.name}" deleted successfully` };
  }

  // Fallback in-memory
  const index = mockProducts.findIndex((p) => p._id.toString() === id.toString());
  if (index === -1) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  const deleted = mockProducts.splice(index, 1)[0];
  return { message: `Product "${deleted.name}" deleted successfully` };
};
