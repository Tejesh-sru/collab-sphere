# Frontend to Backend Connection Guide

## 🔗 Step-by-Step Integration

### Step 1: Start Backend

```bash
# Terminal 1 - Start Backend
cd c:\Users\asus\OneDrive\Desktop\collabsphere1\backend
mvn spring-boot:run
```

**Verify:** http://localhost:8080/swagger-ui/index.html should open

### Step 2: Update Frontend Environment

```bash
# Edit .env file in frontend
VITE_DEMO_MODE=false
VITE_API_BASE_URL=http://localhost:8080/api
```

### Step 3: Update Frontend API Service

Create or update `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// ============ AUTH ENDPOINTS ============

export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// ============ USER ENDPOINTS ============

export const userAPI = {
  getCurrentUser: () => api.get('/users/me'),
  getUserProfile: (userId) => api.get(`/users/${userId}`),
  updateProfile: (data) => api.put('/users/me', data),
  searchUsers: (query) => api.get('/users/search', { params: { q: query } }),
  filterBySkills: (skills) => api.get('/users/filter/skills', { params: { skills } }),
  deleteAccount: () => api.delete('/users/me'),
  changePassword: (data) => api.post('/users/me/password', data),
};

// ============ DASHBOARD ENDPOINTS ============

export const dashboardAPI = {
  getStats: () => api.get('/dashboard/stats'),
  getActivities: (limit = 10) => api.get('/dashboard/activities', { params: { limit } }),
  getSuggestions: (limit = 6) => api.get('/dashboard/suggestions', { params: { limit } }),
};

// ============ CONNECTION ENDPOINTS ============

export const connectionAPI = {
  sendRequest: (userId) => api.post(`/connections/send/${userId}`),
  acceptRequest: (connectionId) => api.put(`/connections/${connectionId}/accept`),
  rejectRequest: (connectionId) => api.put(`/connections/${connectionId}/reject`),
  getPending: () => api.get('/connections/pending'),
  getMyConnections: () => api.get('/connections/my'),
  getCount: () => api.get('/connections/count'),
  getStatus: (userId) => api.get(`/connections/status/${userId}`),
  deleteConnection: (connectionId) => api.delete(`/connections/${connectionId}`),
};

// ============ PROJECT ENDPOINTS ============

export const projectAPI = {
  create: (data) => api.post('/projects', data),
  update: (projectId, data) => api.put(`/projects/${projectId}`, data),
  delete: (projectId) => api.delete(`/projects/${projectId}`),
  get: (projectId) => api.get(`/projects/${projectId}`),
  getMy: () => api.get('/projects/my'),
  getUserProjects: (userId) => api.get(`/projects/user/${userId}`),
  search: (query) => api.get('/projects/search', { params: { q: query } }),
  getAll: () => api.get('/projects/all'),
  filterByTechnology: (technologies) => api.get('/projects/filter/technology', { params: { technologies } }),
};

// ============ MESSAGE ENDPOINTS ============

export const messageAPI = {
  send: (data) => api.post('/messages', data),
  getConversation: (userId) => api.get(`/messages/conversation/${userId}`),
  markAsRead: (messageId) => api.put(`/messages/${messageId}/read`),
  getUnread: () => api.get('/messages/unread'),
  getUnreadCount: () => api.get('/messages/unread/count'),
  getConversations: () => api.get('/messages/conversations'),
  delete: (messageId) => api.delete(`/messages/${messageId}`),
};

// ============ NOTIFICATION ENDPOINTS ============

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markAsRead: (notificationId) => api.put(`/notifications/${notificationId}/read`),
  markAllAsRead: () => api.put('/notifications/read-all'),
  getUnread: () => api.get('/notifications/unread'),
  getUnreadCount: () => api.get('/notifications/unread/count'),
};
```

### Step 4: Update AuthContext

Update `src/contexts/AuthContext.jsx`:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
      // Optionally verify token with backend
      verifyToken();
    }
    setLoading(false);
  }, []);

  const verifyToken = async () => {
    try {
      const response = await userAPI.getCurrentUser();
      setUser(response.data.data);
      localStorage.setItem('user', JSON.stringify(response.data.data));
    } catch (error) {
      // Token invalid, logout
      logout();
    }
  };

  const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const response = await authAPI.register({ email, password, displayName });
      const { token, user: userData } = response.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateUser,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

### Step 5: Update Dashboard Page

Update `src/pages/Dashboard.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { dashboardAPI, projectAPI, connectionAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [activities, setActivities] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, activitiesRes, suggestionsRes] = await Promise.all([
        dashboardAPI.getStats(),
        dashboardAPI.getActivities(10),
        dashboardAPI.getSuggestions(6),
      ]);

      setStats(statsRes.data.data);
      setActivities(activitiesRes.data.data);
      setSuggestions(suggestionsRes.data.data);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (userId) => {
    try {
      await connectionAPI.sendRequest(userId);
      // Refresh suggestions
      const res = await dashboardAPI.getSuggestions(6);
      setSuggestions(res.data.data);
    } catch (error) {
      console.error('Failed to send connection request:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container py-5">
        {/* Stats Section */}
        <div className="row mb-4">
          <div className="col-md-3">
            <Card>
              <h3>{stats?.totalProjects || 0}</h3>
              <p className="text-muted">Projects</p>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <h3>{stats?.totalConnections || 0}</h3>
              <p className="text-muted">Connections</p>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <h3>{stats?.unreadMessages || 0}</h3>
              <p className="text-muted">Messages</p>
            </Card>
          </div>
          <div className="col-md-3">
            <Card>
              <h3>{stats?.pendingRequests || 0}</h3>
              <p className="text-muted">Requests</p>
            </Card>
          </div>
        </div>

        {/* Recent Activities */}
        <h2 className="mb-3">Recent Activities</h2>
        <div className="mb-4">
          {activities.map((activity) => (
            <Card key={activity.id} className="mb-2">
              <p>{activity.description}</p>
              <small className="text-muted">
                {new Date(activity.timestamp).toLocaleDateString()}
              </small>
            </Card>
          ))}
        </div>

        {/* Suggested Connections */}
        <h2 className="mb-3">Suggested Connections</h2>
        <div className="row">
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="col-md-4 mb-3">
              <Card>
                <h5>{suggestion.displayName}</h5>
                <p className="text-muted">{suggestion.university}</p>
                <p className="small">{suggestion.bio}</p>
                <Button onClick={() => handleConnect(suggestion.id)}>
                  Connect
                </Button>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
```

### Step 6: Update Explore Page

Update `src/pages/ExplorePage.jsx`:

```javascript
import { useState, useEffect } from 'react';
import { userAPI, connectionAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';

const ExplorePage = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectionStatuses, setConnectionStatuses] = useState({});

  useEffect(() => {
    searchUsers();
  }, []);

  const searchUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.searchUsers(searchQuery);
      setUsers(response.data.data);
      
      // Load connection statuses
      const statuses = {};
      for (const user of response.data.data) {
        const statusRes = await connectionAPI.getStatus(user.id);
        statuses[user.id] = statusRes.data.data;
      }
      setConnectionStatuses(statuses);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = async (userId) => {
    try {
      await connectionAPI.sendRequest(userId);
      setConnectionStatuses({
        ...connectionStatuses,
        [userId]: 'PENDING_SENT',
      });
    } catch (error) {
      console.error('Connection request failed:', error);
    }
  };

  const getButtonText = (status) => {
    switch (status) {
      case 'CONNECTED': return 'Connected';
      case 'PENDING_SENT': return 'Pending';
      case 'PENDING_RECEIVED': return 'Respond';
      case 'SELF': return 'You';
      default: return 'Connect';
    }
  };

  return (
    <>
      <Navbar />
      <div className="container py-5">
        <h1 className="mb-4">Explore Students</h1>
        
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by name, university, or major..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchUsers()}
          />
          <Button onClick={searchUsers} className="mt-2">Search</Button>
        </div>

        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            {users.map((user) => (
              <div key={user.id} className="col-md-4 mb-4">
                <Card>
                  <img 
                    src={user.photoURL || '/default-avatar.png'} 
                    alt={user.displayName}
                    className="rounded-circle mb-3"
                    width="80"
                    height="80"
                  />
                  <h5>{user.displayName}</h5>
                  <p className="text-muted">{user.university}</p>
                  <p className="text-muted">{user.major}</p>
                  <p className="small">{user.bio}</p>
                  <div className="mb-2">
                    {user.skills?.slice(0, 3).map((skill) => (
                      <span key={skill} className="badge bg-primary me-1">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <Button
                    onClick={() => handleConnect(user.id)}
                    disabled={connectionStatuses[user.id] !== 'NONE'}
                  >
                    {getButtonText(connectionStatuses[user.id])}
                  </Button>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default ExplorePage;
```

### Step 7: Test the Integration

1. **Start Backend**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend**
   ```bash
   cd ../  # Go to frontend directory
   npm run dev
   ```

3. **Test Flow**
   - Open http://localhost:3001
   - Register a new account
   - Verify dashboard loads with stats
   - Try searching for users
   - Send connection requests
   - Create a project
   - Send messages

### Common Issues & Solutions

#### Issue 1: CORS Error
**Error:** "Access to XMLHttpRequest has been blocked by CORS policy"
**Solution:** Backend CORS is configured for ports 3000, 3001, 5173. If using different port, update `CorsConfig.java`

#### Issue 2: 401 Unauthorized
**Error:** "401 Unauthorized" on API calls
**Solution:** Check if token is being sent in request headers. Verify token is stored in localStorage.

#### Issue 3: Database Connection Failed
**Error:** "Could not connect to MySQL"
**Solution:** 
```bash
# Check MySQL is running
mysql -u root -p

# Create database
CREATE DATABASE collabsphere;
```

#### Issue 4: Token Expiration
**Error:** User logged out automatically
**Solution:** Token expires in 24 hours. Implement refresh token or increase expiration in `application.properties`

### Environment Configuration

**Backend:** `application.properties`
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/collabsphere
spring.datasource.username=collabsphere_user
spring.datasource.password=collabsphere_pass
jwt.secret=your-secret-key-at-least-256-bits-long
jwt.expiration=86400000
server.port=8080
```

**Frontend:** `.env`
```env
VITE_DEMO_MODE=false
VITE_API_BASE_URL=http://localhost:8080/api
```

### Testing Checklist

- [ ] Backend starts successfully on port 8080
- [ ] Frontend starts on port 3001
- [ ] Register new user works
- [ ] Login works and stores token
- [ ] Dashboard loads stats correctly
- [ ] User search works
- [ ] Connection requests work
- [ ] Projects CRUD works
- [ ] Messaging works
- [ ] Notifications appear
- [ ] Logout clears token

---

## 🎉 You're All Set!

Your CollabSphere application is now fully integrated with:
- ✅ Real backend API
- ✅ JWT authentication
- ✅ MySQL database persistence
- ✅ All features working end-to-end

**Next:** Start testing and building amazing features! 🚀
