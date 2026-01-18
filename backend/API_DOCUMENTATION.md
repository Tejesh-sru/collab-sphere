# CollabSphere Backend API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All endpoints except `/auth/*` require JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "displayName": "John Doe"
}

Response: 200 OK
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "jwt_token_here",
    "user": { UserDTO }
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response: 200 OK
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "jwt_token_here",
    "user": { UserDTO }
  }
}
```

---

## User Endpoints

### Get Current User
```http
GET /users/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": { UserDTO }
}
```

### Get User Profile
```http
GET /users/{userId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": { UserDTO }
}
```

### Update Profile
```http
PUT /users/me
Authorization: Bearer <token>
Content-Type: application/json

{
  "displayName": "Updated Name",
  "bio": "Updated bio",
  "university": "MIT",
  "major": "Computer Science",
  "year": "Junior",
  "location": "Boston, MA",
  "githubUrl": "https://github.com/username",
  "linkedinUrl": "https://linkedin.com/in/username",
  "twitterUrl": "https://twitter.com/username",
  "skills": ["Java", "React", "Spring Boot"],
  "interests": ["AI", "Web Development"]
}

Response: 200 OK
{
  "success": true,
  "message": "Profile updated successfully",
  "data": { UserDTO }
}
```

### Search Users
```http
GET /users/search?q=john
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ UserDTO... ]
}
```

### Filter Users by Skills
```http
GET /users/filter/skills?skills=Java&skills=React
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ UserDTO... ]
}
```

### Delete Account
```http
DELETE /users/me
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Account deleted successfully"
}
```

### Change Password
```http
POST /users/me/password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "oldpass",
  "newPassword": "newpass"
}

Response: 200 OK
{
  "success": true,
  "message": "Password changed successfully"
}
```

---

## Dashboard Endpoints

### Get Dashboard Statistics
```http
GET /dashboard/stats
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": {
    "totalProjects": 5,
    "totalConnections": 12,
    "unreadMessages": 3,
    "pendingRequests": 2,
    "additionalStats": {
      "totalSkills": 8,
      "totalInterests": 4
    }
  }
}
```

### Get Recent Activities
```http
GET /dashboard/activities?limit=10
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "CONNECTION",
      "description": "Connected with Jane Doe",
      "user": { UserDTO },
      "timestamp": "2024-01-15T10:30:00",
      "actionUrl": "/profile/123"
    },
    ...
  ]
}
```

### Get Suggested Connections
```http
GET /dashboard/suggestions?limit=6
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ UserDTO... ]
}
```

---

## Connection Endpoints

### Send Connection Request
```http
POST /connections/send/{userId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Connection request sent",
  "data": { ConnectionDTO }
}
```

### Accept Connection Request
```http
PUT /connections/{connectionId}/accept
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Connection request accepted",
  "data": { ConnectionDTO }
}
```

### Reject Connection Request
```http
PUT /connections/{connectionId}/reject
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Connection request rejected"
}
```

### Get Pending Requests
```http
GET /connections/pending
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ConnectionDTO... ]
}
```

### Get My Connections
```http
GET /connections/my
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ConnectionDTO... ]
}
```

### Get Connection Count
```http
GET /connections/count
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": 15
}
```

### Get Connection Status with User
```http
GET /connections/status/{userId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": "CONNECTED" // or "NONE", "PENDING_SENT", "PENDING_RECEIVED", "SELF", "REJECTED"
}
```

### Delete Connection
```http
DELETE /connections/{connectionId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Connection removed successfully"
}
```

---

## Project Endpoints

### Create Project
```http
POST /projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "My Awesome Project",
  "description": "A project description",
  "imageUrl": "https://example.com/image.jpg",
  "projectUrl": "https://project.com",
  "githubUrl": "https://github.com/user/project",
  "technologies": ["React", "Node.js", "MongoDB"],
  "status": "IN_PROGRESS" // or "COMPLETED", "PLANNING"
}

Response: 200 OK
{
  "success": true,
  "message": "Project created successfully",
  "data": { ProjectDTO }
}
```

### Update Project
```http
PUT /projects/{projectId}
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "description": "Updated description",
  ...
}

Response: 200 OK
{
  "success": true,
  "message": "Project updated successfully",
  "data": { ProjectDTO }
}
```

### Delete Project
```http
DELETE /projects/{projectId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Project deleted successfully"
}
```

### Get Project
```http
GET /projects/{projectId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": { ProjectDTO }
}
```

### Get My Projects
```http
GET /projects/my
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ProjectDTO... ]
}
```

### Get User's Projects
```http
GET /projects/user/{userId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ProjectDTO... ]
}
```

### Search Projects
```http
GET /projects/search?q=react
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ProjectDTO... ]
}
```

### Get All Projects
```http
GET /projects/all
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ProjectDTO... ]
}
```

### Filter Projects by Technology
```http
GET /projects/filter/technology?technologies=React&technologies=Node.js
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ ProjectDTO... ]
}
```

---

## Message Endpoints

### Send Message
```http
POST /messages
Authorization: Bearer <token>
Content-Type: application/json

{
  "receiverId": 123,
  "content": "Hello! How are you?"
}

Response: 200 OK
{
  "success": true,
  "message": "Message sent",
  "data": { MessageDTO }
}
```

### Get Conversation with User
```http
GET /messages/conversation/{userId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ MessageDTO... ]
}
```

### Mark Message as Read
```http
PUT /messages/{messageId}/read
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Message marked as read"
}
```

### Get Unread Messages
```http
GET /messages/unread
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ MessageDTO... ]
}
```

### Get Unread Messages Count
```http
GET /messages/unread/count
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": 5
}
```

### Get Conversation Partners
```http
GET /messages/conversations
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ UserDTO... ]
}
```

### Delete Message
```http
DELETE /messages/{messageId}
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Message deleted"
}
```

---

## Notification Endpoints

### Get My Notifications
```http
GET /notifications
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ NotificationDTO... ]
}
```

### Mark Notification as Read
```http
PUT /notifications/{notificationId}/read
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "Notification marked as read"
}
```

### Mark All Notifications as Read
```http
PUT /notifications/read-all
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "message": "All notifications marked as read"
}
```

### Get Unread Notifications
```http
GET /notifications/unread
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": [ NotificationDTO... ]
}
```

### Get Unread Notifications Count
```http
GET /notifications/unread/count
Authorization: Bearer <token>

Response: 200 OK
{
  "success": true,
  "data": 8
}
```

---

## Data Transfer Objects (DTOs)

### UserDTO
```json
{
  "id": 123,
  "email": "user@example.com",
  "displayName": "John Doe",
  "photoURL": "https://example.com/photo.jpg",
  "bio": "Software Developer",
  "university": "MIT",
  "major": "Computer Science",
  "year": "Senior",
  "location": "Boston, MA",
  "githubUrl": "https://github.com/johndoe",
  "linkedinUrl": "https://linkedin.com/in/johndoe",
  "twitterUrl": "https://twitter.com/johndoe",
  "emailVerified": true,
  "skills": ["Java", "React", "Spring Boot"],
  "interests": ["AI", "Web Development"],
  "role": "USER",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### ProjectDTO
```json
{
  "id": 456,
  "user": { UserDTO },
  "title": "My Project",
  "description": "Project description",
  "imageUrl": "https://example.com/project.jpg",
  "projectUrl": "https://myproject.com",
  "githubUrl": "https://github.com/user/project",
  "technologies": ["React", "Node.js"],
  "status": "IN_PROGRESS",
  "createdAt": "2024-01-10T00:00:00",
  "updatedAt": "2024-01-15T10:30:00"
}
```

### ConnectionDTO
```json
{
  "id": 789,
  "sender": { UserDTO },
  "receiver": { UserDTO },
  "status": "ACCEPTED",
  "createdAt": "2024-01-12T00:00:00"
}
```

### MessageDTO
```json
{
  "id": 321,
  "sender": { UserDTO },
  "receiver": { UserDTO },
  "content": "Hello!",
  "isRead": false,
  "createdAt": "2024-01-15T10:30:00"
}
```

### NotificationDTO
```json
{
  "id": 654,
  "title": "New Connection Request",
  "message": "John Doe sent you a connection request",
  "type": "CONNECTION_REQUEST",
  "isRead": false,
  "actionUrl": "/connections",
  "createdAt": "2024-01-15T10:30:00"
}
```

---

## Error Responses

All errors return a consistent format:
```json
{
  "success": false,
  "message": "Error message description",
  "data": null
}
```

### Common Error Status Codes
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found (resource doesn't exist)
- `500` - Internal Server Error

---

## Swagger Documentation

Interactive API documentation available at:
```
http://localhost:8080/swagger-ui/index.html
```

---

## Frontend Integration Notes

1. **Set API Base URL** in your frontend `.env`:
   ```
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

2. **Store JWT Token** after login:
   ```javascript
   localStorage.setItem('token', response.data.token);
   ```

3. **Add Token to Requests**:
   ```javascript
   axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
   ```

4. **Handle Token Expiration**:
   - Intercept 401 responses
   - Redirect to login page
   - Clear stored token

5. **CORS** is configured for:
   - `http://localhost:3000`
   - `http://localhost:3001`
   - `http://localhost:5173`
