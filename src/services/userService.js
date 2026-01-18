import api from './api';

/**
 * User Service
 * Handles all user-related API calls
 */
const userService = {
  /**
   * Get current user's profile
   */
  getProfile: async () => {
    const response = await api.get('/users/me');
    return response.data;
  },

  /**
   * Update current user's profile
   * @param {Object} profileData - Profile data to update
   */
  updateProfile: async (profileData) => {
    const response = await api.put('/users/me', profileData);
    return response.data;
  },

  /**
   * Get a user by ID
   * @param {string} userId - User ID
   */
  getUserById: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  /**
   * Search users
   * @param {string} query - Search query
   */
  searchUsers: async (query) => {
    const response = await api.get(`/users/search?q=${query}`);
    return response.data;
  },

  /**
   * Filter users by skills
   * @param {Array} skills - Array of skills to filter by
   */
  filterBySkills: async (skills) => {
    const params = new URLSearchParams();
    skills.forEach(skill => params.append('skills', skill));
    const response = await api.get(`/users/filter/skills?${params.toString()}`);
    return response.data;
  },

  /**
   * Get user's connections
   */
  getConnections: async () => {
    const response = await api.get('/connections/my');
    return response.data;
  },

  /**
   * Send connection request
   * @param {string} userId - Target user ID
   */
  sendConnectionRequest: async (userId) => {
    const response = await api.post(`/connections/send/${userId}`);
    return response.data;
  },

  /**
   * Accept connection request
   * @param {string} connectionId - Connection request ID
   */
  acceptConnection: async (connectionId) => {
    const response = await api.put(`/connections/${connectionId}/accept`);
    return response.data;
  },

  /**
   * Reject connection request
   * @param {string} connectionId - Connection request ID
   */
  rejectConnection: async (connectionId) => {
    const response = await api.put(`/connections/${connectionId}/reject`);
    return response.data;
  },

  /**
   * Get pending connection requests
   */
  getPendingRequests: async () => {
    const response = await api.get('/connections/pending');
    return response.data;
  },

  /**
   * Get connection status with a user
   * @param {string} userId - User ID
   */
  getConnectionStatus: async (userId) => {
    const response = await api.get(`/connections/status/${userId}`);
    return response.data;
  },

  /**
   * Delete/remove connection
   * @param {string} connectionId - Connection ID
   */
  removeConnection: async (connectionId) => {
    const response = await api.delete(`/connections/${connectionId}`);
    return response.data;
  },

  /**
   * Change password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   */
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/users/me/password', {
      currentPassword,
      newPassword,
    });
    return response.data;
  },

  /**
   * Delete account
   */
  deleteAccount: async () => {
    const response = await api.delete('/users/me');
    return response.data;
  },
};

export default userService;
