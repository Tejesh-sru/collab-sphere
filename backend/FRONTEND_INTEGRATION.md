# Connecting Frontend to Backend

This document explains how to connect the React frontend to the Spring Boot backend.

## 🎯 Overview

The backend is now ready at: `http://localhost:8080/api`

## 🔧 Frontend Configuration

Update your frontend `.env` file to disable demo mode and connect to the backend:

```env
# Firebase Configuration (optional - can use backend auth instead)
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Backend API Configuration
VITE_API_BASE_URL=http://localhost:8080/api

# Demo Mode - SET TO FALSE
VITE_DEMO_MODE=false
```

## 📝 Update Frontend Auth Service

The frontend needs to be updated to use backend authentication instead of Firebase.

### Option 1: Use Backend Auth (Recommended)

Update `src/contexts/AuthContext.jsx` to call backend API endpoints:

```javascript
// Login
const login = async (email, password) => {
  const response = await axios.post('/auth/login', { email, password });
  const { token, user } = response.data.data;
  
  // Store token
  localStorage.setItem('token', token);
  setUser(user);
  
  // Set default axios header
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

// Register
const signup = async (email, password, displayName) => {
  const response = await axios.post('/auth/register', { 
    email, 
    password,
    displayName 
  });
  const { token, user } = response.data.data;
  
  localStorage.setItem('token', token);
  setUser(user);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};
```

### Option 2: Keep Firebase Auth + Backend API

Keep Firebase for authentication but use backend for all data:

1. User logs in with Firebase
2. Frontend sends Firebase token to backend
3. Backend validates Firebase token
4. Backend returns JWT token for API calls

## 🔄 API Integration Examples

### Get Current User Profile

```javascript
const getProfile = async () => {
  const response = await axios.get('/users/me');
  return response.data.data;
};
```

### Search Users

```javascript
const searchUsers = async (query) => {
  const response = await axios.get(`/users/search?q=${query}`);
  return response.data.data;
};
```

### Send Connection Request

```javascript
const sendConnectionRequest = async (userId) => {
  const response = await axios.post(`/connections/send/${userId}`);
  return response.data.data;
};
```

### Create Project

```javascript
const createProject = async (projectData) => {
  const response = await axios.post('/projects', projectData);
  return response.data.data;
};
```

### Send Message

```javascript
const sendMessage = async (receiverId, content) => {
  const response = await axios.post('/messages', {
    receiverId,
    content
  });
  return response.data.data;
};
```

## 🔐 Token Management

### Store Token on Login

```javascript
localStorage.setItem('token', token);
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
```

### Load Token on App Start

```javascript
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    // Fetch current user
    fetchCurrentUser();
  }
}, []);
```

### Clear Token on Logout

```javascript
const logout = () => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  setUser(null);
};
```

## 📊 API Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {
    // Response data here
  }
}
```

Error responses:

```json
{
  "success": false,
  "message": "Error message",
  "data": null
}
```

## 🚀 Quick Start

### 1. Start Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs on: http://localhost:8080

### 2. Update Frontend Environment

Edit `.env`:
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEMO_MODE=false
```

### 3. Update Axios Base URL

In `src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### 4. Start Frontend

```bash
cd ..
npm run dev
```

Frontend runs on: http://localhost:3001

## 🧪 Test the Connection

### Test Authentication

1. Register a new user
2. Check browser console for API calls
3. Verify token is stored in localStorage
4. Check backend logs for requests

### Test API Endpoints

Use the Swagger UI to test endpoints:
- Open: http://localhost:8080/api/swagger-ui.html
- Test each endpoint
- Verify responses

## 🐛 Troubleshooting

### CORS Errors

If you see CORS errors, verify `CorsConfig.java` includes your frontend URL:

```java
.allowedOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:5173")
```

### Authentication Errors

- Verify token is included in requests
- Check token hasn't expired
- Verify JWT secret is set in backend

### Database Errors

- Ensure MySQL is running
- Verify database exists
- Check credentials in `application.properties`

## 📝 Next Steps

1. ✅ Backend running on port 8080
2. ⬜ Update frontend .env file
3. ⬜ Disable demo mode
4. ⬜ Test authentication
5. ⬜ Test all API endpoints
6. ⬜ Update user service to use backend
7. ⬜ Update all services to use backend APIs

## 🎯 Complete Integration Checklist

- [ ] Backend API running
- [ ] MySQL database connected
- [ ] Frontend .env updated
- [ ] Demo mode disabled
- [ ] Auth working (login/register)
- [ ] User profile CRUD working
- [ ] Connections working
- [ ] Projects CRUD working
- [ ] Messages working
- [ ] Notifications working

---

**Everything is ready! Now just update the frontend .env and restart both servers.** 🚀
