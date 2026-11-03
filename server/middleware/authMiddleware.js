import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import User from '../models/User.js';
import { mockUsers } from '../services/mockStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'namkeen_super_secret_jwt_key_2026';

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Middleware to verify JWT token and authenticate user
 */
export const authenticateUser = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'error',
        message: 'Authentication failed. No token provided.',
      });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    let user;
    if (isMongoConnected()) {
      user = await User.findById(decoded.id).select('-password');
    } else {
      const found = mockUsers.find((u) => u._id.toString() === decoded.id.toString());
      if (found) {
        const { password, ...safeUser } = found;
        user = safeUser;
      }
    }

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'User belonging to this token no longer exists.',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        status: 'error',
        message: 'Your account has been deactivated. Please contact support.',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid authentication token. Please log in again.',
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        status: 'error',
        message: 'Your session has expired. Please log in again.',
      });
    }
    return res.status(500).json({
      status: 'error',
      message: 'Authentication error: ' + error.message,
    });
  }
};

/**
 * Middleware to restrict access to administrator accounts only
 */
export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({
    status: 'error',
    message: 'Access denied. Administrator privileges are required.',
  });
};
