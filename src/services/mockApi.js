/**
 * Mock Data Service
 * Provides mock data for development until backend is ready
 */

// Mock Users Data
export const mockUsers = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@stanford.edu',
    role: 'Computer Science',
    university: 'Stanford University',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Passionate about AI and machine learning. Looking for research collaborators.',
    skills: ['Machine Learning', 'Python', 'Data Science', 'TensorFlow'],
    interests: ['AI Research', 'Deep Learning', 'Open Source'],
    connections: 234,
    isOnline: true,
    location: 'California, USA',
    joinDate: '2025-01-10',
  },
  {
    id: '2',
    name: 'Marcus Chen',
    email: 'marcus.chen@mit.edu',
    role: 'Software Engineering',
    university: 'MIT',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Full-stack developer building scalable web applications.',
    skills: ['React', 'Node.js', 'JavaScript', 'MongoDB'],
    interests: ['Web Development', 'Startups', 'Open Source'],
    connections: 189,
    isOnline: false,
    location: 'Massachusetts, USA',
    joinDate: '2024-12-15',
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    email: 'emily.r@berkeley.edu',
    role: 'Data Science',
    university: 'UC Berkeley',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Data scientist with a focus on predictive analytics.',
    skills: ['Python', 'Data Science', 'Machine Learning', 'R'],
    interests: ['Data Science', 'AI Research', 'Visualization'],
    connections: 156,
    isOnline: true,
    location: 'California, USA',
    joinDate: '2025-01-05',
  },
];

// Mock Projects Data
export const mockProjects = [
  {
    id: '1',
    title: 'AI Image Generator',
    description: 'Built a GAN-based image generation model using PyTorch.',
    technologies: ['Python', 'PyTorch', 'Machine Learning'],
    owner: '1',
    members: ['1', '3'],
    status: 'active',
    createdAt: '2025-01-01',
  },
  {
    id: '2',
    title: 'Student Collaboration Platform',
    description: 'Full-stack web application connecting students.',
    technologies: ['React', 'Node.js', 'MongoDB'],
    owner: '2',
    members: ['2'],
    status: 'active',
    createdAt: '2024-12-20',
  },
];

// Mock Activities Data
export const mockActivities = [
  {
    id: '1',
    type: 'connection',
    user: mockUsers[0],
    action: 'accepted your connection request',
    time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    icon: 'person-check',
    color: 'success',
  },
  {
    id: '2',
    type: 'message',
    user: mockUsers[1],
    action: 'sent you a message',
    time: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    icon: 'chat-left-text',
    color: 'primary',
  },
  {
    id: '3',
    type: 'project',
    user: mockUsers[2],
    action: 'invited you to join "ML Research Project"',
    time: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    icon: 'folder-plus',
    color: 'warning',
  },
];

// Mock Notifications Data
export const mockNotifications = [
  {
    id: '1',
    type: 'connection_request',
    title: 'New Connection Request',
    message: 'Alex Thompson sent you a connection request',
    read: false,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'message',
    title: 'New Message',
    message: 'You have 3 unread messages',
    read: false,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'endorsement',
    title: 'New Endorsement',
    message: 'Sarah endorsed you for Python',
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

/**
 * Mock API Service
 * Simulates backend API calls with mock data
 */
class MockApiService {
  /**
   * Simulate API delay
   */
  async delay(ms = 500) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Get all users (with search and filter)
   */
  async getUsers(params = {}) {
    await this.delay();
    let users = [...mockUsers];

    // Search by name
    if (params.search) {
      const query = params.search.toLowerCase();
      users = users.filter((user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }

    // Filter by skills
    if (params.skills && params.skills.length > 0) {
      users = users.filter((user) =>
        params.skills.some((skill) => user.skills.includes(skill))
      );
    }

    return {
      data: users,
      total: users.length,
      page: params.page || 1,
      limit: params.limit || 10,
    };
  }

  /**
   * Get user by ID
   */
  async getUserById(userId) {
    await this.delay();
    const user = mockUsers.find((u) => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    return { data: user };
  }

  /**
   * Get current user's profile
   */
  async getProfile() {
    await this.delay();
    // Return first user as current user for demo
    return { data: mockUsers[0] };
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    await this.delay();
    return { data: { ...mockUsers[0], ...profileData }, message: 'Profile updated successfully' };
  }

  /**
   * Get user's connections
   */
  async getConnections() {
    await this.delay();
    return { data: mockUsers.slice(1) }; // Return all users except first
  }

  /**
   * Send connection request
   */
  async sendConnectionRequest(userId) {
    await this.delay();
    return { data: { status: 'sent' }, message: 'Connection request sent' };
  }

  /**
   * Get projects
   */
  async getProjects(params = {}) {
    await this.delay();
    return { data: mockProjects, total: mockProjects.length };
  }

  /**
   * Get project by ID
   */
  async getProjectById(projectId) {
    await this.delay();
    const project = mockProjects.find((p) => p.id === projectId);
    if (!project) {
      throw new Error('Project not found');
    }
    return { data: project };
  }

  /**
   * Get activities
   */
  async getActivities() {
    await this.delay();
    return { data: mockActivities };
  }

  /**
   * Get notifications
   */
  async getNotifications() {
    await this.delay();
    return { data: mockNotifications };
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId) {
    await this.delay();
    return { data: { id: notificationId, read: true }, message: 'Notification marked as read' };
  }

  /**
   * Search users (autocomplete)
   */
  async searchUsers(query) {
    await this.delay(200); // Faster for autocomplete
    const results = mockUsers.filter((user) =>
      user.name.toLowerCase().includes(query.toLowerCase())
    );
    return { data: results };
  }
}

export const mockApi = new MockApiService();
export default mockApi;
