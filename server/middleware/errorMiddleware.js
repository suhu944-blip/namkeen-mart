/**
 * 404 Route Not Found Handler
 */
export const notFound = (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Not Found: ${req.method} ${req.originalUrl}`,
  });
};

/**
 * Global Application Error Handler
 */
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);
  let message = err.message;

  // Handle Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found with the specified ID.';
  }

  // Handle Mongoose duplicate key error (e.g., duplicate email)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value entered for ${field}. Please use another value.`;
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(', ');
  }

  res.status(statusCode).json({
    status: 'error',
    message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
