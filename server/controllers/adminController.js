import * as adminService from '../services/adminService.js';
import * as productService from '../services/productService.js';
import * as categoryService from '../services/categoryService.js';

/**
 * @desc    Get dashboard metrics & summary
 * @route   GET /api/admin/dashboard
 * @access  Private (Admin)
 */
export const getDashboard = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.status(200).json({
      status: 'success',
      data: { stats },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products (active & inactive) with filters for admin table
 * @route   GET /api/admin/products
 * @access  Private (Admin)
 */
export const getAdminProducts = async (req, res, next) => {
  try {
    const { search, category } = req.query;
    const products = await productService.getAllProductsAdmin({ search, category });
    res.status(200).json({
      status: 'success',
      count: products.length,
      data: { products },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all categories (active & inactive) with product counts for admin table
 * @route   GET /api/admin/categories
 * @access  Private (Admin)
 */
export const getAdminCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategoriesAdmin();
    res.status(200).json({
      status: 'success',
      count: categories.length,
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};
