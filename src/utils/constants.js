/**
 * Constants
 * Application-wide constants and configuration
 */

// App Info
export const APP_NAME = 'CollabSphere';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Student Networking & Mentorship Platform';

// API Endpoints (to be used when backend is ready)
export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  RESET_PASSWORD: '/auth/reset-password',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_BY_ID: (id) => `/users/${id}`,
  SEARCH_USERS: '/users/search',
  
  // Connections
  CONNECTIONS: '/connections',
  CONNECTION_REQUESTS: '/connections/requests',
  SEND_REQUEST: (userId) => `/connections/${userId}/request`,
  ACCEPT_REQUEST: (requestId) => `/connections/${requestId}/accept`,
  REJECT_REQUEST: (requestId) => `/connections/${requestId}/reject`,
  
  // Mentors
  MENTORS: '/mentors',
  MENTOR_REQUESTS: '/mentors/requests',
  
  // Projects
  PROJECTS: '/projects',
  PROJECT_BY_ID: (id) => `/projects/${id}`,
  PROJECT_MEMBERS: (id) => `/projects/${id}/members`,
  
  // Messages
  MESSAGES: '/messages',
  CONVERSATIONS: '/messages/conversations',
  CONVERSATION_BY_ID: (id) => `/messages/conversations/${id}`,
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  MARK_READ: (id) => `/notifications/${id}/read`,
  MARK_ALL_READ: '/notifications/mark-all-read',
  
  // Events
  EVENTS: '/events',
  EVENT_BY_ID: (id) => `/events/${id}`,
  EVENT_ATTENDEES: (id) => `/events/${id}/attendees`,
};

// Pagination
export const ITEMS_PER_PAGE = 12;
export const MAX_PAGINATION_BUTTONS = 5;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

// Form Limits
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_BIO_LENGTH = 500;
export const MAX_PROJECT_DESCRIPTION_LENGTH = 1000;
export const MAX_MESSAGE_LENGTH = 2000;

// Skills & Interests Options
export const SKILLS_OPTIONS = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'React',
  'Node.js',
  'Angular',
  'Vue.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Machine Learning',
  'Data Science',
  'AI',
  'Deep Learning',
  'Computer Vision',
  'NLP',
  'UI/UX Design',
  'Figma',
  'Adobe XD',
  'Mobile Development',
  'iOS',
  'Android',
  'React Native',
  'Flutter',
  'DevOps',
  'Docker',
  'Kubernetes',
  'AWS',
  'Azure',
  'GCP',
  'Cybersecurity',
  'Blockchain',
  'Web3',
  'Game Development',
  'Unity',
  'Unreal Engine',
];

export const INTERESTS_OPTIONS = [
  'AI Research',
  'Web Development',
  'Mobile Apps',
  'Game Development',
  'Blockchain',
  'Cybersecurity',
  'Data Science',
  'Machine Learning',
  'Cloud Computing',
  'IoT',
  'AR/VR',
  'Open Source',
  'Startups',
  'Entrepreneurship',
  'Hackathons',
  'Competitive Programming',
  'Research',
  'Teaching',
  'Mentorship',
];

// Universities (Sample list)
export const UNIVERSITIES = [
  'Stanford University',
  'MIT',
  'Harvard University',
  'UC Berkeley',
  'Carnegie Mellon University',
  'Caltech',
  'Princeton University',
  'Yale University',
  'Columbia University',
  'University of Oxford',
  'University of Cambridge',
  'ETH Zurich',
  'Other',
];

// Study Levels
export const STUDY_LEVELS = [
  'High School',
  'Undergraduate',
  'Graduate',
  'PhD',
  'Postdoc',
  'Alumni',
];

// Connection Status
export const CONNECTION_STATUS = {
  NOT_CONNECTED: 'not_connected',
  PENDING_SENT: 'pending_sent',
  PENDING_RECEIVED: 'pending_received',
  CONNECTED: 'connected',
};

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  MENTOR: 'mentor',
  ADMIN: 'admin',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  CONNECTION_REQUEST: 'connection_request',
  CONNECTION_ACCEPTED: 'connection_accepted',
  MESSAGE: 'message',
  PROJECT_INVITATION: 'project_invitation',
  ENDORSEMENT: 'endorsement',
  EVENT_INVITATION: 'event_invitation',
};

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'collabsphere-theme',
  AUTH_TOKEN: 'collabsphere-auth-token',
  USER_DATA: 'collabsphere-user-data',
  REMEMBER_ME: 'collabsphere-remember-me',
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  USER_PROFILE: (userId) => `/profile/${userId}`,
  EXPLORE: '/explore',
  SETTINGS: '/settings',
  MESSAGES: '/messages',
  NOTIFICATIONS: '/notifications',
  PROJECTS: '/projects',
  EVENTS: '/events',
};

// Social Links (Placeholders)
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/collabsphere',
  LINKEDIN: 'https://linkedin.com/company/collabsphere',
  GITHUB: 'https://github.com/collabsphere',
  INSTAGRAM: 'https://instagram.com/collabsphere',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You need to be logged in to access this.',
  FORBIDDEN: 'You do not have permission to access this.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.',
  VALIDATION_ERROR: 'Please check your input and try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  SIGNUP_SUCCESS: 'Account created successfully!',
  PROFILE_UPDATE_SUCCESS: 'Profile updated successfully!',
  PASSWORD_CHANGE_SUCCESS: 'Password changed successfully!',
  CONNECTION_REQUEST_SENT: 'Connection request sent!',
  MESSAGE_SENT: 'Message sent successfully!',
};
