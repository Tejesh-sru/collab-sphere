# Frontend-Backend Integration Guide

## ✅ Integration Complete!

The CollabSphere frontend has been successfully connected to the Spring Boot backend API.

---

## 🔧 What Was Changed

### 1. Environment Configuration (`.env`)
- Updated `VITE_API_BASE_URL` to `http://localhost:8080/api`
- Set `VITE_DEMO_MODE` to `false` to use real backend

### 2. API Service (`src/services/api.js`)
- **Removed Firebase dependency** for authentication
- **Updated token handling** to use JWT from localStorage
- Token automatically attached to all API requests via interceptor
- Base URL now points to Spring Boot backend (port 8080)

### 3. Authentication Context (`src/contexts/AuthContext.jsx`)
- **Removed all Firebase auth methods**
- **Integrated with backend auth endpoints**:
  - `/auth/register` - User registration
  - `/auth/login` - User login
  - `/users/me` - Get current user
  - `/users/me` - Update profile
  - `/users/me/password` - Change password
- JWT token stored in localStorage
- Token automatically included in API requests

### 4. User Service (`src/services/userService.js`)
Updated all endpoints to match backend API:
- `/users/me` - Get/Update current user
- `/users/{id}` - Get user by ID
- `/users/search` - Search users
- `/users/filter/skills` - Filter by skills
- `/connections/*` - All connection endpoints
- `/users/me/password` - Change password
- `/users/me` - Delete account

### 5. New Services Created

#### Project Service (`src/services/projectService.js`)
- Create, read, update, delete projects
- Search and filter projects
- Manage collaborators

#### Message Service (`src/services/messageService.js`)
- Get conversations
- Send/receive messages
- Mark as read
- Unread count

#### Dashboard Service (`src/services/dashboardService.js`)
- Get statistics
- Recent activities
- Connection suggestions

---

## 🚀 How to Start

### 1. Start the Backend (Required!)
```bash
cd backend
.\start-backend.bat
```
**Or manually:**
```bash
cd backend
mvn spring-boot:run
```

Backend will run on: `http://localhost:8080`

### 2. Start the Frontend
```bash
npm run dev
```

Frontend will run on: `http://localhost:5173`

---

## 🔐 Authentication Flow

### Registration
1. User submits email, password, and display name
2. Frontend calls `POST /auth/register`
3. Backend creates user and returns JWT token
4. Token stored in localStorage
5. User automatically logged in

### Login
1. User submits email and password
2. Frontend calls `POST /auth/login`
3. Backend validates credentials and returns JWT token
4. Token stored in localStorage
5. User redirected to dashboard

### Protected Routes
1. User navigates to protected route
2. Frontend checks for token in localStorage
3. If token exists, calls `GET /users/me` to verify
4. If valid, user allowed access
5. If invalid, redirected to login

### API Requests
1. All API calls go through axios interceptor
2. Token automatically added to Authorization header
3. Format: `Bearer <token>`
4. Backend validates token on each request

---

## 📡 API Endpoints Available

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user

### Users
- `GET /users/me` - Get current user
- `PUT /users/me` - Update profile
- `GET /users/{id}` - Get user by ID
- `GET /users/search?q={query}` - Search users
- `GET /users/filter/skills?skills={skill}` - Filter by skills
- `POST /users/me/password` - Change password
- `DELETE /users/me` - Delete account

### Connections
- `POST /connections/send/{userId}` - Send request
- `PUT /connections/{id}/accept` - Accept request
- `PUT /connections/{id}/reject` - Reject request
- `GET /connections/pending` - Get pending requests
- `GET /connections/my` - Get my connections
- `GET /connections/status/{userId}` - Check status
- `DELETE /connections/{id}` - Remove connection

### Projects
- `GET /projects/my` - Get my projects
- `GET /projects/{id}` - Get project
- `POST /projects` - Create project
- `PUT /projects/{id}` - Update project
- `DELETE /projects/{id}` - Delete project
- `GET /projects/search?q={query}` - Search projects

### Messages
- `GET /messages/conversations` - Get conversations
- `GET /messages/conversation/{id}` - Get messages
- `POST /messages/send` - Send message
- `PUT /messages/conversation/{id}/read` - Mark read

### Dashboard
- `GET /dashboard/stats` - Get statistics
- `GET /dashboard/activities` - Recent activities
- `GET /dashboard/suggestions` - Connection suggestions

---

## 🧪 Testing the Integration

### 1. Register a New User
```javascript
// This happens automatically through the UI
// POST http://localhost:8080/api/auth/register
{
  "email": "test@example.com",
  "password": "password123",
  "displayName": "Test User"
}
```

### 2. Verify Token Storage
Open browser DevTools → Application → Local Storage
- Should see `token` key with JWT value

### 3. Check API Calls
Open browser DevTools → Network tab
- All API calls should go to `http://localhost:8080/api/*`
- Should see `Authorization: Bearer <token>` in headers

### 4. Test Protected Endpoints
Navigate to Dashboard after login:
- Should call `GET /users/me`
- Should call `GET /dashboard/stats`
- Should call `GET /dashboard/activities`

---

## 🐛 Troubleshooting

### Backend Not Running
**Error:** `Network Error` or `ERR_CONNECTION_REFUSED`
**Solution:** Start the backend with `cd backend && mvn spring-boot:run`

### CORS Errors
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`
**Solution:** Backend already has CORS configured. Make sure backend is running on port 8080.

### 401 Unauthorized
**Error:** API returns 401
**Solution:** 
- Token may be expired or invalid
- Logout and login again
- Check localStorage for valid token

### Token Not Included in Requests
**Solution:**
- Check that token exists in localStorage
- Verify axios interceptor is working
- Clear browser cache and retry

### Database Connection Issues
**Error:** Backend fails to start
**Solution:** 
- Ensure MySQL is running on localhost:3306
- Check database credentials in `application.properties`
- Database will be created automatically if it doesn't exist

---

## 📝 Environment Variables

### Frontend (`.env`)
```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_DEMO_MODE=false
VITE_APP_NAME=CollabSphere
VITE_APP_VERSION=1.0.0
```

### Backend (`application.properties`)
```properties
server.port=8080
server.servlet.context-path=/api
spring.datasource.url=jdbc:mysql://localhost:3306/collabsphere
jwt.secret=<secret-key>
jwt.expiration=86400000
```

---

## 🎯 Next Steps

1. **Test all features** through the UI
2. **Add error handling** for edge cases
3. **Implement loading states** in components
4. **Add toast notifications** for user feedback
5. **Test with multiple users** to verify connections
6. **Implement real-time updates** with WebSockets (optional)

---

## 📚 Additional Resources

- [Backend API Documentation](./backend/API_DOCUMENTATION.md)
- [Backend Integration Guide](./backend/INTEGRATION_GUIDE.md)
- [Frontend Integration Guide](./backend/FRONTEND_INTEGRATION.md)

---

## ✨ Key Features Integrated

✅ JWT-based authentication
✅ User registration and login
✅ Profile management
✅ User search and filtering
✅ Connection requests (send, accept, reject)
✅ Project CRUD operations
✅ Messaging system
✅ Dashboard statistics
✅ Activity feed
✅ Connection suggestions

**The frontend is now fully integrated with the backend!** 🎉
