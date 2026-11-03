import mongoose from 'mongoose';

/**
 * Connect to MongoDB database
 */
export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      console.warn('⚠️  Warning: MONGO_URI is not defined in environment variables. Database connection skipped.');
      return;
    }

    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
