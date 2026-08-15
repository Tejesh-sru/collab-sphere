import axiosInstance from './axiosInstance';
import { store } from '../app/store';
import { setAccessToken, clearAuth } from '../features/auth/authSlice';

/**
 * Attaches the in-memory access token to every outgoing request.
 * The token deliberately lives only in Redux state (memory), never in
 * localStorage — see MENTOR_NOTES.md in the backend for why.
 */
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let pendingQueue = [];

const processQueue = (error, token = null) => {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  pendingQueue = [];
};

/**
 * On a 401 (expired access token), silently call /auth/refresh using
 * the httpOnly cookie, then retry the original request exactly once.
 * If several requests 401 at the same moment, only ONE refresh call is
 * made and the rest wait on `pendingQueue` — otherwise a page with 5
 * simultaneous requests would trigger 5 refresh calls and 5 rotations.
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const { data } = await axiosInstance.post('/auth/refresh');
      const newToken = data.data.accessToken;
      store.dispatch(setAccessToken(newToken));
      processQueue(null, newToken);
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      store.dispatch(clearAuth());
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
