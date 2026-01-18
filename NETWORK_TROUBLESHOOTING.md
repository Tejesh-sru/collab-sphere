# Network Error - Troubleshooting Guide 🔧

## ✅ Current Status

**Backend:** Running on port 8080 (PID: 20040)
**Frontend:** Running on port 3001
**Database:** MySQL connected

## 🔍 Quick Checks

### 1. Verify Backend is Running

```powershell
# Check if backend is listening on port 8080
netstat -ano | Select-String ":8080"
```

Expected output:
```
TCP    0.0.0.0:8080    0.0.0.0:0    LISTENING    [PID]
```

### 2. Test Backend Health

Open your browser and navigate to:
- **Test Page:** `file:///C:/Users/asus/OneDrive/Desktop/collabsphere1/test-connection.html`
- Or manually test: `http://localhost:8080/api/actuator/health`

### 3. Check Frontend Configuration

Frontend should connect to: `http://localhost:8080/api`

This is configured in `src/services/api.js`:
```javascript
baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
```

## 🚨 Common Network Errors & Solutions

### Error: "Network Error" or "Cannot connect to server"

**Cause:** Backend is not running

**Solution:**
```powershell
# Navigate to backend directory
cd C:\Users\asus\OneDrive\Desktop\collabsphere1\backend

# Start backend
java -jar target\collabsphere-backend-1.0.0.jar
```

### Error: "CORS Error" or "Cross-Origin Request Blocked"

**Cause:** CORS not configured properly

**Solution:** Check `backend/src/main/java/com/collabsphere/config/WebConfig.java`

The CORS configuration should allow:
```java
.allowedOrigins("http://localhost:3000", "http://localhost:3001", "http://localhost:5173")
```

### Error: "Port 8080 already in use"

**Cause:** Another process is using port 8080

**Solution:**
```powershell
# Find process using port 8080
netstat -ano | Select-String ":8080"

# Kill the process (replace [PID] with actual process ID)
Stop-Process -Id [PID] -Force

# Or change backend port in application.properties
# server.port=8081
```

### Error: "Failed to fetch" or "ERR_CONNECTION_REFUSED"

**Cause:** Backend server is not accessible

**Checklist:**
- [ ] Backend is running: `netstat -ano | Select-String ":8080"`
- [ ] Firewall is not blocking port 8080
- [ ] MySQL database is running
- [ ] No network proxy interfering

## 🛠️ Step-by-Step Fix

### Step 1: Stop All Processes

```powershell
# Stop any Java processes
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force

# Stop frontend (Ctrl+C in terminal or close terminal)
```

### Step 2: Start Backend

```powershell
cd C:\Users\asus\OneDrive\Desktop\collabsphere1\backend
java -jar target\collabsphere-backend-1.0.0.jar
```

Wait for this message:
```
Started CollabSphereApplication in X.XXX seconds
Tomcat started on port 8080 (http) with context path '/api'
```

### Step 3: Start Frontend

In a new terminal:
```powershell
cd C:\Users\asus\OneDrive\Desktop\collabsphere1
npm run dev
```

### Step 4: Test Connection

1. Open browser to `http://localhost:3001`
2. Open browser console (F12)
3. Check for any network errors
4. Login and navigate to Teams page

## 📊 Diagnostic Information

### Check Backend Logs

Look for these in the backend terminal:
- ✅ `Tomcat started on port 8080`
- ✅ `Started CollabSphereApplication`
- ✅ `HikariPool-1 - Start completed` (Database connected)
- ❌ `Port 8080 was already in use` (Error)
- ❌ `Unable to acquire JDBC Connection` (Database error)

### Check Frontend Console

Look for these in browser console (F12):
- ✅ API requests to `http://localhost:8080/api/*`
- ❌ `Network error - Cannot connect to server` (Backend down)
- ❌ `CORS policy: No 'Access-Control-Allow-Origin'` (CORS issue)
- ❌ `401 Unauthorized` (Auth token missing/invalid)

## 🔐 Authentication Errors

### Error: 401 Unauthorized

**Cause:** Invalid or missing JWT token

**Solution:**
1. Logout and login again
2. Clear browser localStorage: `localStorage.clear()`
3. Check if token is being sent in request headers

### Error: 403 Forbidden

**Cause:** User doesn't have permission for the resource

**Note:** This is expected for some protected endpoints like `/actuator/health`

## 🌐 Browser-Specific Issues

### Chrome/Edge

1. Open DevTools (F12)
2. Go to Network tab
3. Try the failing request again
4. Check:
   - Request URL
   - Request Method
   - Status Code
   - Response

### Firefox

1. Open Developer Tools (F12)
2. Go to Console tab
3. Check for CORS or network errors

## 📝 Quick Commands Reference

```powershell
# Check backend status
netstat -ano | Select-String ":8080"

# Check Java processes
Get-Process -Name java

# Start backend
cd backend; java -jar target\collabsphere-backend-1.0.0.jar

# Start frontend
npm run dev

# Test API
curl http://localhost:8080/api/actuator/health

# View backend logs in real-time
# (Watch the terminal where backend is running)
```

## 🆘 Still Having Issues?

1. **Check MySQL:** Make sure MySQL is running and accessible
2. **Check application.properties:** Verify database credentials
3. **Rebuild backend:** 
   ```powershell
   cd backend
   mvn clean package -DskipTests
   ```
4. **Clear npm cache:**
   ```powershell
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

## 📞 Need Help?

Check these files for configuration:
- Backend: `backend/src/main/resources/application.properties`
- Frontend API: `src/services/api.js`
- CORS: `backend/src/main/java/com/collabsphere/config/WebConfig.java`

---

**Last Updated:** Network is working! Backend running on port 8080, Frontend on port 3001
