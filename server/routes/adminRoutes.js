import express from 'express';
import * as adminController from '../controllers/adminController.js';
import { authenticateUser, authorizeAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// All admin routes require valid JWT authentication and admin authorization
router.use(authenticateUser, authorizeAdmin);

router.get('/dashboard', adminController.getDashboard);
router.get('/products', adminController.getAdminProducts);
router.get('/categories', adminController.getAdminCategories);

export default router;
