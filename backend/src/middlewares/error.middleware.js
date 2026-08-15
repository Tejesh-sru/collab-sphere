const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');

/**
 * Converts known error types (Mongoose validation, duplicate key,
 * invalid ObjectId, JWT errors) into a consistent ApiError shape.
 * Anything unrecognized becomes a generic 500 - and its details are
 * logged, never leaked to the client.
 */
function normalizeError(err) {
  if (err instanceof ApiError) return err;

  // Mongoose duplicate key (e.g. email already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return ApiError.conflict(`An account with this ${field} already exists`);
  }

  // Mongoose schema validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return ApiError.badRequest('Validation failed', errors);
  }

  // Invalid ObjectId passed to a query
  if (err.name === 'CastError') {
    return ApiError.badRequest(`Invalid value for field: ${err.path}`);
  }

  if (err.name === 'JsonWebTokenError') return ApiError.unauthorized('Invalid token');
  if (err.name === 'TokenExpiredError') return ApiError.unauthorized('Token expired');

  return ApiError.internal(process.env.NODE_ENV === 'production' ? 'Something went wrong' : err.message);
}

// eslint-disable-next-line no-unused-vars
function errorMiddleware(err, req, res, next) {
  const normalized = normalizeError(err);

  if (!normalized.isOperational) {
    logger.error(err.stack || err.message);
  }

  res.status(normalized.statusCode).json({
    success: false,
    statusCode: normalized.statusCode,
    message: normalized.message,
    errors: normalized.errors,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}

function notFoundMiddleware(req, res, next) {
  next(ApiError.notFound(`Route not found: ${req.method} ${req.originalUrl}`));
}

module.exports = { errorMiddleware, notFoundMiddleware };
