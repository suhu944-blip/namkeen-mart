import express from 'express';
import cors from 'cors';
import healthRoutes from './routes/health.routes.js';

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

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/health', healthRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'Namkeen Mart Backend API',
    version: '1.0.0',
    status: 'Running',
    healthCheck: '/api/health',
  });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

export default app;
