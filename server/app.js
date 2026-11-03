import express from 'express';
import cors from 'cors';

// Route imports
import healthRoutes from './routes/health.routes.js';
import authRoutes from './routes/authRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

// Middleware imports
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const app = express();

// Configure CORS
const allowedOrigins = process.env.CLIENT_URL ? [process.env.CLIENT_URL] : ['http://localhost:5173'];
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      return callback(new Error('Blocked by CORS policy'));
    },
    credentials: true,
  })
);

// Body parser middleware (supports JSON and url-encoded payloads)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API Routes
app.use('/api/health', healthRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

// Root Welcome Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Namkeen Mart Backend API',
    version: '2.0.0',
    status: 'Running',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      categories: '/api/categories',
      products: '/api/products',
      admin: '/api/admin',
    },
  });
});

// 404 & Global Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;
