import * as categoryService from '../services/categoryService.js';

/**
 * @desc    Get active categories for public storefront
 * @route   GET /api/categories
 * @access  Public
 */
export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getActiveCategories();
    res.status(200).json({
      status: 'success',
      count: categories.length,
      data: { categories },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
export const getCategoryById = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Create new category
 * @route   POST /api/categories
 * @access  Private (Admin)
 */
export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Category created successfully.',
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update existing category
 * @route   PUT /api/categories/:id
 * @access  Private (Admin)
 */
export const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.status(200).json({
      status: 'success',
      message: 'Category updated successfully.',
      data: { category },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete a category
 * @route   DELETE /api/categories/:id
 * @access  Private (Admin)
 */
export const deleteCategory = async (req, res, next) => {
  try {
    const result = await categoryService.deleteCategory(req.params.id);
    res.status(200).json({
      status: 'success',
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};
