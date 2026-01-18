import axios from 'axios';

/**
 * Axios API Client
 * Configured with base URL and interceptors
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request interceptor
 * Adds auth token to requests
 */
api.interceptors.request.use(
  async (config) => {
    // Get JWT token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handles common response scenarios
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          console.error('Unauthorized access - Please login again');
          // Optional: redirect to login
          // window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden - You do not have permission');
          break;
        case 404:
          // Not found
          console.error('Resource not found');
          break;
        case 500:
          // Server error
          console.error('Server error - Please try again later');
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else if (error.request) {
      // Network error - no response received
      console.error('Network error - Cannot connect to server');
      console.error('Make sure the backend is running on http://localhost:8080');
      console.error('Error details:', error.message);
      
      // Show user-friendly message
      const errorMessage = error.code === 'ECONNREFUSED' || error.code === 'ERR_NETWORK'
        ? 'Cannot connect to server. Please make sure the backend is running on port 8080.'
        : 'Network error. Please check your internet connection.';
      
      // You can optionally show a toast/alert here
      console.warn('USER MESSAGE:', errorMessage);
    } else {
      console.error('Request error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
