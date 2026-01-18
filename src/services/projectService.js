import api from './api';

/**
 * Project Service
 * Handles all project-related API calls
 */
const projectService = {
  /**
   * Get all projects for current user
   */
  getMyProjects: async () => {
    const response = await api.get('/projects/my');
    return response.data;
  },

  /**
   * Get a project by ID
   * @param {string} projectId - Project ID
   */
  getProjectById: async (projectId) => {
    const response = await api.get(`/projects/${projectId}`);
    return response.data;
  },

  /**
   * Get projects by user ID
   * @param {string} userId - User ID
   */
  getProjectsByUserId: async (userId) => {
    const response = await api.get(`/projects/user/${userId}`);
    return response.data;
  },

  /**
   * Create a new project
   * @param {Object} projectData - Project data
   */
  createProject: async (projectData) => {
    const response = await api.post('/projects', projectData);
    return response.data;
  },

  /**
   * Update a project
   * @param {string} projectId - Project ID
   * @param {Object} projectData - Updated project data
   */
  updateProject: async (projectId, projectData) => {
    const response = await api.put(`/projects/${projectId}`, projectData);
    return response.data;
  },

  /**
   * Delete a project
   * @param {string} projectId - Project ID
   */
  deleteProject: async (projectId) => {
    const response = await api.delete(`/projects/${projectId}`);
    return response.data;
  },

  /**
   * Search projects
   * @param {string} query - Search query
   */
  searchProjects: async (query) => {
    const response = await api.get(`/projects/search?q=${query}`);
    return response.data;
  },

  /**
   * Filter projects by technologies
   * @param {Array} technologies - Array of technologies
   */
  filterByTechnologies: async (technologies) => {
    const params = new URLSearchParams();
    technologies.forEach(tech => params.append('technologies', tech));
    const response = await api.get(`/projects/filter/technologies?${params.toString()}`);
    return response.data;
  },

  /**
   * Add collaborator to project
   * @param {string} projectId - Project ID
   * @param {string} userId - User ID to add
   */
  addCollaborator: async (projectId, userId) => {
    const response = await api.post(`/projects/${projectId}/collaborators/${userId}`);
    return response.data;
  },

  /**
   * Remove collaborator from project
   * @param {string} projectId - Project ID
   * @param {string} userId - User ID to remove
   */
  removeCollaborator: async (projectId, userId) => {
    const response = await api.delete(`/projects/${projectId}/collaborators/${userId}`);
    return response.data;
  },
};

export default projectService;
