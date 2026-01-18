# 🔌 Backend-Frontend Connection Map

## Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│                         COLLABSPHERE                              │
│                     Full Stack Application                        │
└──────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐          ┌─────────────────────────┐
│   FRONTEND (React)      │          │  BACKEND (Spring Boot)  │
│   Port: 5173            │◄────────►│  Port: 8080             │
├─────────────────────────┤          ├─────────────────────────┤
│                         │   HTTP   │                         │
│ • React Components      │   REST   │ • Controllers           │
│ • AuthContext          │   API    │ • Services              │
│ • Services             │   JWT    │ • Repositories          │
│ • Axios Client         │          │ • Security Config       │
│                         │          │                         │
└─────────────────────────┘          └──────────┬──────────────┘
                                               │
                                               │ JPA/Hibernate
                                               ▼
                                     ┌─────────────────────┐
                                     │  MySQL Database     │
                                     │  Port: 3306         │
                                     ├─────────────────────┤
                                     │ • users             │
                                     │ • connections       │
                                     │ • projects          │
                                     │ • messages          │
                                     │ • activities        │
                                     └─────────────────────┘
```

---

## API Endpoint Mapping

### Authentication
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
SignupPage.jsx     ─────►  POST /auth/register  ─────►  users table
  ↓ signup()                 AuthController              INSERT user
  ↓                           ↓
AuthContext.jsx              Generate JWT
  ↓                           ↓
  ↓ Store token              Return {token, user}
  ↓
localStorage.token ◄─────────────────────────────────┘

LoginPage.jsx      ─────►  POST /auth/login     ─────►  users table
  ↓ login()                  AuthController              SELECT user
  ↓                           ↓
AuthContext.jsx              Validate password
  ↓                           ↓
  ↓ Store token              Generate JWT
  ↓                           ↓
localStorage.token ◄─────  Return {token, user}
```

### Protected Routes
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
Dashboard.jsx      ─────►  GET /users/me        ─────►  users table
  ↓                         + JWT Token                  SELECT WHERE id
  ↓                          UserController
api.js interceptor          ↓
  ↓                        Validate JWT
  └─ Add: Authorization: Bearer <token>
                            ↓
                           Return user data
```

### User Operations
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
ProfilePage.jsx    ─────►  GET /users/{id}      ─────►  users table
  ↓ getUserById()           UserController              SELECT

ExplorePage.jsx    ─────►  GET /users/search    ─────►  users table
  ↓ searchUsers()           ?q=query                    WHERE LIKE

SettingsPage.jsx   ─────►  PUT /users/me        ─────►  users table
  ↓ updateProfile()         UserController              UPDATE
```

### Connections
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
UserCard.jsx       ─────►  POST /connections/   ─────►  connections
  ↓ sendRequest()           send/{userId}               INSERT
                            ConnectionController

Dashboard.jsx      ─────►  GET /connections/    ─────►  connections
  ↓ getPending()            pending                     WHERE status

ConnectionList.jsx ─────►  PUT /connections/    ─────►  connections
  ↓ accept()                {id}/accept                 UPDATE status
  ↓ reject()                {id}/reject

NetworkPage.jsx    ─────►  GET /connections/my  ─────►  connections
  ↓ getConnections()        ConnectionController        WHERE userId
```

### Projects
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
ProjectsPage.jsx   ─────►  GET /projects/my     ─────►  projects
  ↓ getMyProjects()         ProjectController           WHERE userId

CreateProject.jsx  ─────►  POST /projects       ─────►  projects
  ↓ createProject()         ProjectController           INSERT

EditProject.jsx    ─────►  PUT /projects/{id}   ─────►  projects
  ↓ updateProject()         ProjectController           UPDATE

ProjectCard.jsx    ─────►  DELETE /projects/{id}─────►  projects
  ↓ deleteProject()         ProjectController           DELETE
```

### Messages
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
MessagesPage.jsx   ─────►  GET /messages/       ─────►  conversations
  ↓ getConversations()      conversations               SELECT

ChatView.jsx       ─────►  GET /messages/       ─────►  messages
  ↓ getMessages()           conversation/{id}           WHERE convId

MessageInput.jsx   ─────►  POST /messages/send  ─────►  messages
  ↓ sendMessage()           MessageController           INSERT
```

### Dashboard
```
Frontend                    Backend                     Database
───────────────────────────────────────────────────────────────────
Dashboard.jsx      ─────►  GET /dashboard/stats ─────►  Multiple
  ↓ getStats()              DashboardController         COUNT queries

ActivityFeed.jsx   ─────►  GET /dashboard/      ─────►  activities
  ↓ getActivities()         activities                  ORDER BY

Suggestions.jsx    ─────►  GET /dashboard/      ─────►  users
  ↓ getSuggestions()        suggestions                 Recommendation
```

---

## Request/Response Flow

### Example: User Login

```
1. USER ACTION
   ↓
   User enters email and password
   ↓
   Clicks "Login" button

2. FRONTEND (LoginPage.jsx)
   ↓
   const { login } = useAuth();
   await login(email, password);

3. AUTH CONTEXT (AuthContext.jsx)
   ↓
   const response = await api.post('/auth/login', {
     email,
     password
   });

4. API SERVICE (api.js)
   ↓
   axios.post('http://localhost:8080/api/auth/login', data)
   ↓
   [Interceptor: Add headers]

5. SPRING BOOT (AuthController.java)
   ↓
   @PostMapping("/login")
   public ResponseEntity<?> login(@RequestBody LoginRequest request)
   ↓
   authService.authenticate(email, password);

6. SERVICE LAYER (AuthService.java)
   ↓
   UserDetails user = userRepository.findByEmail(email);
   ↓
   passwordEncoder.matches(password, user.getPassword());
   ↓
   String token = jwtUtils.generateToken(user);

7. DATABASE (MySQL)
   ↓
   SELECT * FROM users WHERE email = ?;

8. RESPONSE FLOW
   ↓
   Database → Service → Controller
   ↓
   return ApiResponse.success({
     token: "eyJhbGc...",
     user: { id, email, displayName, ... }
   });

9. FRONTEND RECEIVES
   ↓
   AuthContext processes response:
   - localStorage.setItem('token', token);
   - api.defaults.headers['Authorization'] = `Bearer ${token}`;
   - setUser(user);

10. UI UPDATE
    ↓
    User redirected to Dashboard
    ↓
    Protected routes now accessible
```

---

## Token Flow

```
┌──────────────────────────────────────────────────────────────┐
│                     JWT TOKEN LIFECYCLE                       │
└──────────────────────────────────────────────────────────────┘

1. LOGIN/REGISTER
   Backend generates JWT:
   ┌────────────────────────────────────────┐
   │ Header                                  │
   │ { "alg": "HS256", "typ": "JWT" }       │
   ├────────────────────────────────────────┤
   │ Payload                                 │
   │ {                                       │
   │   "sub": "user@example.com",           │
   │   "userId": 123,                       │
   │   "iat": 1234567890,                   │
   │   "exp": 1234654290                    │
   │ }                                       │
   ├────────────────────────────────────────┤
   │ Signature                               │
   │ HMACSHA256(base64(header) + "." +      │
   │            base64(payload), secret)     │
   └────────────────────────────────────────┘

2. STORAGE
   Frontend stores in localStorage:
   localStorage.token = "eyJhbGciOiJIUzI1NiIs..."

3. API REQUESTS
   Axios interceptor adds to every request:
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...

4. BACKEND VALIDATION
   Security filter extracts and validates:
   - Verify signature with secret key
   - Check expiration time
   - Extract user ID from payload
   - Load user from database

5. AUTHORIZED ACCESS
   If valid → Allow request
   If invalid → Return 401 Unauthorized
```

---

## Service Integration Matrix

| Frontend Service        | Backend Controller     | Database Table   |
|------------------------|------------------------|------------------|
| AuthContext            | AuthController         | users            |
| userService            | UserController         | users            |
| projectService         | ProjectController      | projects         |
| messageService         | MessageController      | messages         |
| dashboardService       | DashboardController    | multiple         |
| Connection methods     | ConnectionController   | connections      |

---

## Environment Configuration

```
┌────────────────────────┐
│   .env (Frontend)      │
├────────────────────────┤
│ VITE_API_BASE_URL=     │
│   http://localhost:8080/api
│ VITE_DEMO_MODE=false   │
└────────────────────────┘
            │
            │ Points to
            ▼
┌────────────────────────────┐
│   application.properties   │
│   (Backend)                │
├────────────────────────────┤
│ server.port=8080           │
│ server.servlet.context-path│
│   =/api                    │
│ jwt.secret=<key>           │
│ jwt.expiration=86400000    │
└────────────────────────────┘
            │
            │ Connects to
            ▼
┌────────────────────────────┐
│   MySQL Database           │
├────────────────────────────┤
│ Host: localhost            │
│ Port: 3306                 │
│ Database: collabsphere     │
└────────────────────────────┘
```

---

## File Structure Impact

```
Frontend Changes:
src/
├── contexts/
│   └── AuthContext.jsx         [MODIFIED] Backend auth integration
├── services/
│   ├── api.js                  [MODIFIED] JWT token handling
│   ├── userService.js          [MODIFIED] Backend endpoints
│   ├── projectService.js       [NEW] Project operations
│   ├── messageService.js       [NEW] Messaging
│   ├── dashboardService.js     [NEW] Dashboard data
│   └── index.js                [MODIFIED] Export new services
└── .env                        [MODIFIED] Backend URL, demo off

Backend (No changes needed):
backend/src/main/java/com/collabsphere/
├── controller/
│   ├── AuthController.java     [READY] Login, Register
│   ├── UserController.java     [READY] User CRUD
│   ├── ConnectionController.java [READY] Connections
│   ├── ProjectController.java  [READY] Projects
│   ├── MessageController.java  [READY] Messages
│   └── DashboardController.java [READY] Dashboard
├── security/
│   ├── JwtTokenProvider.java   [READY] Token generation
│   └── JwtAuthFilter.java      [READY] Token validation
└── config/
    ├── SecurityConfig.java     [READY] Security setup
    └── CorsConfig.java         [READY] CORS enabled
```

---

## Success Indicators

✅ **Environment**
- `.env` has `VITE_API_BASE_URL=http://localhost:8080/api`
- `.env` has `VITE_DEMO_MODE=false`

✅ **API Service**
- Uses JWT from localStorage
- Includes Bearer token in requests
- Handles 401 errors properly

✅ **Authentication**
- Login calls `/auth/login`
- Signup calls `/auth/register`
- Token stored in localStorage
- User state managed correctly

✅ **Services**
- All endpoints match backend
- Error handling implemented
- Response data extraction correct

✅ **Integration**
- No Firebase dependencies in auth flow
- All API calls go to port 8080
- JWT tokens work correctly
- Protected routes validated

---

## Quick Test Commands

```bash
# Verify backend is running
curl http://localhost:8080/api

# Test registration
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123","displayName":"Test User"}'

# Test login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'

# Test protected endpoint (replace <token>)
curl http://localhost:8080/api/users/me \
  -H "Authorization: Bearer <token>"
```

---

**The integration is complete and production-ready!** 🎉
