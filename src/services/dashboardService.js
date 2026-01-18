import api from './api';

/**
 * Dashboard Service
 * Handles all dashboard-related API calls
 */
const dashboardService = {
  /**
   * Get dashboard statistics
   */
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },

  /**
   * Get recent activities
   * @param {number} limit - Number of activities to fetch
   */
  getActivities: async (limit = 10) => {
    const response = await api.get(`/dashboard/activities?limit=${limit}`);
    return response.data;
  },

  /**
   * Get suggested connections
   * @param {number} limit - Number of suggestions to fetch
   */
  getSuggestions: async (limit = 6) => {
    const response = await api.get(`/dashboard/suggestions?limit=${limit}`);
    return response.data;
  },
};

export default dashboardService;
