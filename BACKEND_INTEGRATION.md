# Backend Integration Guide

## 🔌 Connecting to Your Backend

CollabSphere is built to be backend-agnostic. Follow these steps to integrate your own backend.

## 📋 Prerequisites

Your backend should provide:
- RESTful API endpoints
- JWT-based authentication (or integrate with Firebase)
- CORS configuration for frontend domain

## 🛠️ Integration Steps

### 1. Update API Configuration

Edit `src/services/api.js` to point to your backend:

```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://your-backend.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

### 2. Configure Environment Variables

Update `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000/api  # Development
# VITE_API_BASE_URL=https://your-backend.com/api  # Production
```

### 3. Backend API Endpoints Required

The frontend expects these endpoints (see `src/utils/constants.js`):

#### Authentication
- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/logout` - User logout
- `POST /auth/refresh` - Refresh token
- `POST /auth/reset-password` - Password reset

#### Users
- `GET /users` - Get all users
- `GET /users/profile` - Get current user profile
- `GET /users/:id` - Get user by ID
- `PUT /users/profile` - Update profile
- `GET /users/search?q=query` - Search users
- `POST /users/avatar` - Upload avatar

#### Connections
- `GET /connections` - Get user connections
- `GET /connections/requests` - Get connection requests
- `POST /connections/:userId/request` - Send connection request
- `POST /connections/:requestId/accept` - Accept request
- `POST /connections/:requestId/reject` - Reject request

#### Projects
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get project by ID
- `POST /projects` - Create project
- `PUT /projects/:id` - Update project
- `DELETE /projects/:id` - Delete project

#### Messages
- `GET /messages/conversations` - Get conversations
- `GET /messages/conversations/:id` - Get conversation
- `POST /messages` - Send message

#### Notifications
- `GET /notifications` - Get notifications
- `POST /notifications/:id/read` - Mark as read
- `POST /notifications/mark-all-read` - Mark all as read

### 4. API Response Format

Expected response format:

```javascript
// Success Response
{
  "data": { /* response data */ },
  "message": "Success message",
  "status": 200
}

// Error Response
{
  "error": "Error message",
  "status": 400/401/403/404/500
}
```

### 5. Authentication Flow

The frontend uses Firebase Authentication by default. To use your own auth:

#### Option A: Keep Firebase Auth + Backend API
- Frontend uses Firebase for auth
- Send Firebase ID token to backend
- Backend verifies token with Firebase Admin SDK

#### Option B: Replace with Custom Auth

1. Modify `src/contexts/AuthContext.jsx`:

```javascript
const login = async (email, password) => {
  try {
    setError(null);
    // Replace with your API call
    const response = await api.post('/auth/login', { email, password });
    const { token, user } = response.data;
    
    // Store token
    localStorage.setItem('auth-token', token);
    setUser(user);
    
    return { success: true, user };
  } catch (err) {
    setError(err.message);
    return { success: false, error: err.message };
  }
};
```

2. Update `src/services/api.js` interceptor:

```javascript
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
```

### 6. Mock Data vs Real API

The app includes mock data in `src/services/mockApi.js`. To switch:

```javascript
// In your components, instead of:
import { mockApi } from '../services/mockApi';

// Use:
import { userService } from '../services/userService';

// Or create a feature flag:
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';
const api = USE_MOCK_API ? mockApi : userService;
```

### 7. WebSocket Integration (Optional)

For real-time features (messages, notifications):

```javascript
// src/services/websocket.js
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WS_URL);

socket.on('connect', () => {
  console.log('Connected to WebSocket');
});

socket.on('notification', (data) => {
  // Handle real-time notification
});

export default socket;
```

### 8. File Upload Configuration

Update `src/services/userService.js` for avatar upload:

```javascript
uploadAvatar: async (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  return response.data;
}
```

## 🔒 Security Considerations

- Enable CORS on backend for your frontend domain
- Use HTTPS in production
- Implement rate limiting on backend
- Validate all inputs on backend
- Use secure HTTP-only cookies for tokens (recommended)
- Implement CSRF protection
- Sanitize user-generated content

## 🧪 Testing Backend Integration

```bash
# Set backend URL
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# Start frontend
npm run dev

# Test authentication flow
# Test API calls in browser console
```

## 📚 Example Backend Stacks

### Node.js + Express
```javascript
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

// Your routes here
app.post('/api/auth/login', (req, res) => {
  // Handle login
});
```

### Python + Flask
```python
from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:3001'])

@app.route('/api/auth/login', methods=['POST'])
def login():
    # Handle login
    pass
```

### Python + FastAPI
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/auth/login")
async def login():
    # Handle login
    pass
```

## 🆘 Troubleshooting

**CORS errors:**
- Check backend CORS configuration
- Verify frontend domain is allowed
- Use proper credentials flag

**401 Unauthorized:**
- Check token is being sent correctly
- Verify token format in Authorization header
- Check token expiration

**Network errors:**
- Verify API_BASE_URL is correct
- Check backend is running
- Verify network connectivity

## 📞 Support

For backend integration help:
- Check `src/services/` for service examples
- Review `src/utils/constants.js` for API endpoints
- See mock data in `src/services/mockApi.js` for expected formats
