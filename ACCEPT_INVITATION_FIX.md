# Quick Fix for "Failed to Accept Invitation"

## Issue
Backend server wasn't responding when you tried to accept the invitation.

## Solution - Follow These Steps:

### 1. Wait for Backend to Fully Start
The backend takes 20-30 seconds to start up completely.

**Check if it's ready:**
- Look at the Java/PowerShell window that opened
- Wait until you see: `Started CollabSphereApplication`
- OR run this command:
```powershell
Invoke-WebRequest -Uri http://localhost:8080/actuator/health -UseBasicParsing
```

### 2. Refresh the Teams Page
- Go to your browser (http://localhost:3001)
- Press `Ctrl + Shift + R` (hard refresh)
- Or just press `F5`

### 3. Try Accepting Again
- Navigate to "Teams" page
- You should see your pending invitation
- Click "Accept" button

### 4. If Still Fails - Check Browser Console
1. Press `F12` to open developer tools
2. Go to "Console" tab
3. Look for any red error messages
4. Look for network errors

### 5. Common Issues:

**"Network Error" or "ERR_CONNECTION_REFUSED"**
- Backend isn't running
- Wait 30 seconds and try again
- Check the Java window for errors

**"401 Unauthorized" or "403 Forbidden"**
- Your JWT token expired
- Logout and login again

**"404 Not Found"**
- Wrong API endpoint (shouldn't happen)
- Check browser console for the exact URL being called

### 6. Quick Backend Restart (if needed):
```powershell
# Stop all Java processes
Stop-Process -Name java -Force -ErrorAction SilentlyContinue

# Wait
Start-Sleep -Seconds 3

# Restart backend
cd C:\Users\asus\OneDrive\Desktop\collabsphere1\backend
$env:DB_URL='jdbc:mysql://localhost:3306/collabsphere?allowPublicKeyRetrieval=true'
$env:DB_USERNAME='root'
$env:DB_PASSWORD='Teju@chess123'
java -jar target\collabsphere-backend-1.0.0.jar
```

## Expected Flow:
1. ✅ Login as student (sarah.j@university.edu)
2. ✅ Go to Teams page
3. ✅ See pending invitation
4. ✅ Click "Accept"
5. ✅ See success message: "Invitation accepted! Welcome to the team."
6. ✅ Page refreshes
7. ✅ Invitation moves to "My Teams" section
8. ✅ Your status shows "ACCEPTED"

## What Happens When You Accept:
- Your status changes from PENDING → ACCEPTED
- Team checks if all members accepted
- When enough members accept (3+):
  - Team status → READY
  - Project is auto-assigned!
  - Team status → ACTIVE
  - You can now view the project and start working!

Try again in 10-15 seconds! 🚀
