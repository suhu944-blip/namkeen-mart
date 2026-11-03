import express from 'express';
import * as productController from '../controllers/productController.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', productController.getProducts);
router.get('/featured', productController.getFeaturedProducts);
router.get('/category/:categoryId', productController.getProductsByCategory);
router.get('/:id', productController.getProductById);

// Protected Admin routes
router.post('/', authenticateUser, authorizeAdmin, productController.createProduct);
router.put('/:id', authenticateUser, authorizeAdmin, productController.updateProduct);
router.delete('/:id', authenticateUser, authorizeAdmin, productController.deleteProduct);

export default router;
