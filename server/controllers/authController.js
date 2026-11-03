import * as authService from '../services/authService.js';

/**
 * @desc    Register a new customer
 * @route   POST /api/auth/register
 * @access  Public
 */
export const register = async (req, res, next) => {
  try {
    const { name, email, mobile, password } = req.body;
    const result = await authService.registerCustomer({ name, email, mobile, password });

    res.status(201).json({
      status: 'success',
      message: 'Registration successful! Welcome to Namkeen Mart.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Authenticate user (customer or admin)
 * @route   POST /api/auth/login
 * @access  Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser({ email, password });

    res.status(200).json({
      status: 'success',
      message: 'Login successful.',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private (Authenticated)
 */
export const getMe = async (req, res, next) => {
  try {
    const user = await authService.getUserById(req.user._id);

    res.status(200).json({
      status: 'success',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};
