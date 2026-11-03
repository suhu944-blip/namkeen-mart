import mongoose from 'mongoose';
import Product from '../models/Product.js';
import Category from '../models/Category.js';
import { mockProducts, mockCategories } from './mockStore.js';

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Compute aggregate metrics for the admin dashboard
 */
export const getDashboardStats = async () => {
  if (isMongoConnected()) {
    const [
      totalProducts,
      totalCategories,
      activeProducts,
      inactiveProducts,
      activeCategories,
      inactiveCategories,
      lowStockProducts,
      recentProducts,
    ] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments(),
      Product.countDocuments({ isActive: true }),
      Product.countDocuments({ isActive: false }),
      Category.countDocuments({ isActive: true }),
      Category.countDocuments({ isActive: false }),
      Product.countDocuments({ stock: { $lte: 5 } }),
      Product.find().populate('category', 'name').sort({ createdAt: -1 }).limit(5),
    ]);

    return {
      totalProducts,
      totalCategories,
      activeProducts,
      inactiveProducts,
      activeCategories,
      inactiveCategories,
      lowStockProducts,
      recentProducts,
    };
  }

  // Fallback in-memory
  const totalProducts = mockProducts.length;
  const totalCategories = mockCategories.length;
  const activeProducts = mockProducts.filter((p) => p.isActive).length;
  const inactiveProducts = mockProducts.filter((p) => !p.isActive).length;
  const activeCategories = mockCategories.filter((c) => c.isActive).length;
  const inactiveCategories = mockCategories.filter((c) => !c.isActive).length;
  const lowStockProducts = mockProducts.filter((p) => p.stock <= 5).length;
  const recentProducts = [...mockProducts]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5)
    .map((p) => {
      const cat = mockCategories.find((c) => c._id.toString() === p.category.toString());
      return {
        ...p,
        category: cat ? { _id: cat._id, name: cat.name } : null,
      };
    });

  return {
    totalProducts,
    totalCategories,
    activeProducts,
    inactiveProducts,
    activeCategories,
    inactiveCategories,
    lowStockProducts,
    recentProducts,
  };
};
