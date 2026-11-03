import dotenv from 'dotenv';
// Load environment variables before other imports
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB database
connectDB();

// Start HTTP server
const server = app.listen(PORT, () => {
  console.log(`🚀 Namkeen Mart Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  console.log(`👉 Health check: http://localhost:${PORT}/api/health`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
