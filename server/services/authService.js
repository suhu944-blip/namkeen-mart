import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { mockUsers } from './mockStore.js';

const JWT_SECRET = process.env.JWT_SECRET || 'namkeen_super_secret_jwt_key_2026';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

const isMongoConnected = () => mongoose.connection.readyState === 1;

/**
 * Generate signed JWT token
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role,
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

/**
 * Register a new customer
 */
export const registerCustomer = async ({ name, email, mobile, password }) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (isMongoConnected()) {
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      const error = new Error('An account with this email address already exists.');
      error.statusCode = 400;
      throw error;
    }

    const user = await User.create({
      name: name.trim(),
      email: normalizedEmail,
      mobile: mobile.trim(),
      password,
      role: 'customer',
      isActive: true,
    });

    const token = generateToken(user);
    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  // Fallback in-memory mode
  const existingMock = mockUsers.find((u) => u.email === normalizedEmail);
  if (existingMock) {
    const error = new Error('An account with this email address already exists.');
    error.statusCode = 400;
    throw error;
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const newUser = {
    _id: new mongoose.Types.ObjectId().toString(),
    name: name.trim(),
    email: normalizedEmail,
    mobile: mobile.trim(),
    password: hashedPassword,
    role: 'customer',
    isActive: true,
    createdAt: new Date(),
  };

  mockUsers.push(newUser);
  const token = generateToken(newUser);

  return {
    user: {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      mobile: newUser.mobile,
      role: newUser.role,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
    },
    token,
  };
};

/**
 * Authenticate customer or admin login
 */
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error('Please provide both email and password.');
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.toLowerCase().trim();

  if (isMongoConnected()) {
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const error = new Error('Invalid email or password.');
      error.statusCode = 401;
      throw error;
    }

    if (!user.isActive) {
      const error = new Error('Your account is deactivated. Please contact support.');
      error.statusCode = 403;
      throw error;
    }

    const token = generateToken(user);
    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
      token,
    };
  }

  // Fallback in-memory mode
  const user = mockUsers.find((u) => u.email === normalizedEmail);
  if (!user) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  const isMatch = bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid email or password.');
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error('Your account is deactivated. Please contact support.');
    error.statusCode = 403;
    throw error;
  }

  const token = generateToken(user);
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
    },
    token,
  };
};

/**
 * Get profile of currently authenticated user
 */
export const getUserById = async (userId) => {
  if (isMongoConnected()) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      const error = new Error('User not found.');
      error.statusCode = 404;
      throw error;
    }
    return user;
  }

  const user = mockUsers.find((u) => u._id.toString() === userId.toString());
  if (!user) {
    const error = new Error('User not found.');
    error.statusCode = 404;
    throw error;
  }
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
