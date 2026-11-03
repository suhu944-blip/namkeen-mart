import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategoryById);

// Protected Admin routes
router.post('/', authenticateUser, authorizeAdmin, categoryController.createCategory);
router.put('/:id', authenticateUser, authorizeAdmin, categoryController.updateCategory);
router.delete('/:id', authenticateUser, authorizeAdmin, categoryController.deleteCategory);

export default router;
