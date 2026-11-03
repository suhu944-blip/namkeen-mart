import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 * Returns boolean indicating connection status
 */
export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.warn('⚠️  Warning: MONGO_URI is not defined in environment variables. Database connection skipped.');
      return false;
    }

    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
    return false;
  }
};
