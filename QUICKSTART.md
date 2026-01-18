# Quick Start Guide - Frontend-Backend Integration

## ⚡ Quick Start

### Option 1: Use the Launcher Script (Recommended)
```bash
# Windows
.\start-fullstack.bat

# Linux/Mac
chmod +x start-fullstack.sh
./start-fullstack.sh
```

### Option 2: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

---

## 🔍 Verify Integration

1. **Backend Running:** Visit http://localhost:8080/api
2. **Frontend Running:** Visit http://localhost:5173
3. **Create Account:** Register a new user
4. **Check Console:** Should see API calls to http://localhost:8080/api/*

---

## 📦 What's Connected

| Feature | Frontend | Backend Endpoint |
|---------|----------|------------------|
| **Register** | Signup Form | `POST /auth/register` |
| **Login** | Login Form | `POST /auth/login` |
| **Profile** | Profile Page | `GET/PUT /users/me` |
| **Search Users** | Explore Page | `GET /users/search` |
| **Connections** | Dashboard | `GET /connections/my` |
| **Send Request** | User Profile | `POST /connections/send/{id}` |
| **Projects** | Projects Page | `GET/POST /projects` |
| **Messages** | Messages | `GET/POST /messages/*` |
| **Dashboard** | Dashboard | `GET /dashboard/*` |

---

## 🔐 Authentication

### How It Works
1. User logs in → Backend returns JWT token
2. Token saved to `localStorage.token`
3. All API calls include `Authorization: Bearer <token>`
4. Backend validates token on each request

### Test Authentication
```javascript
// Open browser console
localStorage.getItem('token')  // Should show JWT token after login
```

---

## 🧪 Test Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can register new user
- [ ] Can login with created user
- [ ] Token appears in localStorage
- [ ] Dashboard loads user data
- [ ] Can search for users
- [ ] Can send connection requests
- [ ] Can create projects
- [ ] Network tab shows calls to localhost:8080

---

## 🐛 Common Issues

### Backend Won't Start
```bash
# Make sure MySQL is running
# Check backend/src/main/resources/application.properties
# Update database credentials if needed
```

### Frontend Shows Demo Data
```bash
# Check .env file
# Make sure VITE_DEMO_MODE=false
# Restart frontend: npm run dev
```

### API Calls Fail
```bash
# Verify backend is running on port 8080
# Check browser console for CORS errors
# Clear localStorage and try again
```

### Can't Login After Registration
```bash
# Check backend logs for errors
# Verify database is created
# Try with demo credentials from backend
```

---

## 📝 Default Test Users

The backend has demo data. You can also create your own users through registration.

---

## 🎯 Next Steps

1. Start both servers
2. Register a new account
3. Explore the dashboard
4. Search for other users
5. Send connection requests
6. Create projects

---

**Need Help?** Check [FRONTEND_BACKEND_INTEGRATION.md](./FRONTEND_BACKEND_INTEGRATION.md) for detailed documentation.
