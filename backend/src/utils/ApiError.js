/**
 * Standardized application error. Every deliberate error thrown in the
 * codebase should be one of these so the central error middleware can
 * turn it into a consistent JSON response.
 */
class ApiError extends Error {
  /**
   * @param {number} statusCode HTTP status code (400, 401, 403, 404, 409, 500...)
   * @param {string} message Human-readable message safe to show the client
   * @param {Array}  errors  Optional array of field-level validation errors
   * @param {boolean} isOperational Whether this is an expected/handled error
   */
  constructor(statusCode, message, errors = [], isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.isOperational = isOperational;
    this.success = false;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = 'Bad Request', errors = []) {
    return new ApiError(400, message, errors);
  }
  static unauthorized(message = 'Unauthorized') {
    return new ApiError(401, message);
  }
  static forbidden(message = 'Forbidden') {
    return new ApiError(403, message);
  }
  static notFound(message = 'Resource not found') {
    return new ApiError(404, message);
  }
  static conflict(message = 'Conflict') {
    return new ApiError(409, message);
  }
  static internal(message = 'Internal Server Error') {
    return new ApiError(500, message, [], false);
  }
}

module.exports = ApiError;
