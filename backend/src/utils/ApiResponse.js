/**
 * Standardized success envelope so every endpoint returns the same shape:
 * { success, statusCode, message, data }
 * This makes the frontend's Axios response interceptor trivial to write.
 */
class ApiResponse {
  constructor(statusCode, data = null, message = 'Success') {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;
