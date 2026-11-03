import * as productService from '../services/productService.js';

/**
 * @desc    Get active products for storefront (with search, category filter, sorting)
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res, next) => {
  try {
    const { search, category, sort } = req.query;
    const products = await productService.getActiveProducts({ search, category, sort });

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
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await productService.getProductById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get featured products
 * @route   GET /api/products/featured
 * @access  Public
 */
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await productService.getFeaturedProducts();
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
 * @desc    Get products by category ID
 * @route   GET /api/products/category/:categoryId
 * @access  Public
 */
export const getProductsByCategory = async (req, res, next) => {
  try {
    const products = await productService.getProductsByCategoryId(req.params.categoryId);
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
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private (Admin)
 */
export const createProduct = async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Product created successfully.',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing product
 * @route   PUT /api/products/:id
 * @access  Private (Admin)
 */
export const updateProduct = async (req, res, next) => {
  try {
    const product = await productService.updateProduct(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'Product updated successfully.',
      data: { product },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private (Admin)
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const result = await productService.deleteProduct(req.params.id);
    res.status(200).json({
      status: 'success',
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
