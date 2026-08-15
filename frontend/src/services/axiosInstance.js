import axios from 'axios';

/**
 * `withCredentials: true` is what lets the browser send/receive the
 * httpOnly refreshToken cookie set by the backend — without it, the
 * refresh flow silently fails with no cookie ever leaving the browser.
 */
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export default axiosInstance;
