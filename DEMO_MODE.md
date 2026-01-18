# 🎮 Demo Mode - Testing Without Firebase

## Quick Start

**Test the app immediately without setting up Firebase!**

### Option 1: Use Pre-configured Demo Accounts

The app is already in **Demo Mode**. Just log in with these test accounts:

| Email | Password | Name |
|-------|----------|------|
| `demo@test.com` | `demo123` | Demo User |
| `john@test.com` | `john123` | John Doe |
| `jane@test.com` | `jane123` | Jane Smith |

### How to Use Demo Mode

1. **Start the app**:
   ```powershell
   npm run dev
   ```

2. **Open browser**: http://localhost:3001

3. **Log in** with any demo account above

4. **Explore features**:
   - ✅ Login/Logout works
   - ✅ View Dashboard
   - ✅ Edit Profile
   - ✅ Browse Students
   - ✅ Toggle Dark/Light theme
   - ✅ All navigation works

---

## What Works in Demo Mode?

✅ **Authentication**:
- Login with demo accounts
- Logout
- Session persistence (localStorage)
- Password reset (simulated)
- Profile updates

✅ **All Pages**:
- Dashboard with mock data
- Profile page
- Explore students
- Settings
- All navigation

✅ **Features**:
- Dark/Light theme toggle
- Responsive design
- All components render
- Form validation
- Mock API data

❌ **What Doesn't Work**:
- Real Firebase authentication
- Email verification
- Social login (Google, GitHub)
- Real-time database
- File uploads to Firebase Storage

---

## Testing Scenarios

### Test Login
```
Email: demo@test.com
Password: demo123
```
**Result**: Should log you in and redirect to Dashboard

### Test Invalid Login
```
Email: wrong@test.com
Password: wrong123
```
**Result**: Should show error "Invalid email or password"

### Test Signup
Demo mode doesn't allow new signups - use existing demo accounts.

### Test Password Reset
1. Go to Login page
2. Click "Forgot Password?"
3. Enter any email
4. Check browser console for confirmation message

---

## Switch to Real Firebase

When you're ready to use real Firebase:

### Step 1: Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project (or use existing)
3. Enable **Email/Password** authentication
4. Copy your config values

### Step 2: Update .env File

```env
# Disable Demo Mode
VITE_DEMO_MODE=false

# Add Real Firebase Credentials
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:xxxxx
```

### Step 3: Restart Dev Server

```powershell
# Stop current server (Ctrl+C)
npm run dev
```

### Step 4: Test Real Auth

Now you can create real accounts and they'll be stored in Firebase!

---

## How Demo Mode Works

### Demo User Storage
- Demo users stored in **localStorage**
- Session persists on page refresh
- Data cleared on logout

### Mock Authentication Flow
1. User enters credentials
2. App checks against demo users array
3. If match found, creates session
4. Stores user in localStorage
5. Updates auth state

### Code Location
Demo mode logic in: [src/contexts/AuthContext.jsx](src/contexts/AuthContext.jsx)

---

## Custom Demo Users

Want to add your own demo users? Edit `.env`:

```env
VITE_DEMO_MODE=true
```

Then in `src/contexts/AuthContext.jsx`, add to `DEMO_USERS` array:

```javascript
const DEMO_USERS = [
  { email: 'demo@test.com', password: 'demo123', name: 'Demo User', uid: 'demo-user-1' },
  { email: 'john@test.com', password: 'john123', name: 'John Doe', uid: 'demo-user-2' },
  { email: 'jane@test.com', password: 'jane123', name: 'Jane Smith', uid: 'demo-user-3' },
  // Add your custom demo user:
  { email: 'test@test.com', password: 'test123', name: 'Test User', uid: 'demo-user-4' },
];
```

---

## Troubleshooting

### "Invalid email or password" error
- ✅ Make sure you're using exact demo credentials
- ✅ Check VITE_DEMO_MODE=true in .env
- ✅ Restart dev server after .env changes

### Demo user not persisting
- ✅ Check browser localStorage (DevTools > Application > Local Storage)
- ✅ Clear localStorage and try again
- ✅ Make sure cookies aren't blocked

### Want to switch back to demo mode?
```env
VITE_DEMO_MODE=true
```
Restart server and use demo accounts again!

---

## Security Note

⚠️ **Demo mode is for development/testing only!**

- Never use in production
- Demo passwords are visible in code
- No real security
- Sessions only stored in localStorage

For production, **always use real Firebase** with proper security rules!

---

## Quick Reference

### Demo Accounts
```
demo@test.com / demo123
john@test.com / john123
jane@test.com / jane123
```

### Toggle Demo Mode
```env
VITE_DEMO_MODE=true   # Demo mode ON
VITE_DEMO_MODE=false  # Real Firebase
```

### Start Server
```powershell
npm run dev
```

### Access App
```
http://localhost:3001
```

---

**Happy Testing! 🚀**
