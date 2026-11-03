import express from 'express';

const router = express.Router();

/**
 * @route   GET /api/health
 * @desc    Check API health and operational status
 * @access  Public
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Namkeen Mart API is healthy and operational',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

export default router;
