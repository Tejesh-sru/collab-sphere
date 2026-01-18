# LinkedIn-Style Notification System - Test Guide

## ✅ Features Implemented

### 1. **Real-Time Notifications**
- Auto-refresh every 30 seconds
- Unread count badge on bell icon
- Click notification bell to see dropdown
- Smooth animations and hover effects

### 2. **Notification Types**

#### Connection Notifications ✅
- **Connection Request Received** - When someone sends you a connection request
- **Connection Accepted** - When someone accepts your connection request

#### Team Notifications ✅ (NEW)
- **Team Invitation** - When you're invited to join a team or be a mentor
- **Team Member Joined** - When someone accepts your team invitation
- **Project Assigned** - When a project is assigned to your team

## 🧪 How to Test

### Test 1: Connection Request Notifications

1. **Login as User A** (e.g., john@example.com / password123)
2. Go to "Browse Students" or "Explore"
3. Click "Connect" on User B's profile
4. **Login as User B** in another browser/incognito
5. **✅ VERIFY:** Bell icon shows **(1)** badge
6. Click bell icon
7. **✅ VERIFY:** See notification: "User A sent you a connection request"
8. Click on the notification
9. **✅ VERIFY:** Navigates to connections page
10. **✅ VERIFY:** Notification marked as read (badge count decreases)
11. Accept the connection request
12. **Login back as User A**
13. **✅ VERIFY:** See notification: "User B accepted your connection request"

### Test 2: Team Invitation Notifications

1. **Login as Team Leader** (e.g., alice@example.com)
2. Go to "Teams" → "Create Team"
3. Fill in team details (name, skills, max members)
4. Click "Create with Auto-Match" or manually invite users
5. **Login as Invited User** in another browser
6. **✅ VERIFY:** Bell icon shows notification count
7. Click bell icon
8. **✅ VERIFY:** See notification: "Alice invited you to join team [Team Name]"
9. Click on the notification
10. **✅ VERIFY:** Navigates to Teams page
11. Find the team and click "Accept"
12. **Login back as Team Leader**
13. **✅ VERIFY:** See notification: "[User] accepted your invitation to join [Team Name]"

### Test 3: Mentor Invitation Notifications

1. **Create a team** that requires a mentor
2. System auto-assigns a mentor
3. **Login as the Mentor**
4. **✅ VERIFY:** See notification: "You've been invited as a mentor for team [Team Name]"
5. Click on notification → Navigate to Teams
6. Accept the mentor invitation

### Test 4: Project Assignment Notifications

1. **Create a team** with required members
2. Wait for all members to accept invitations
3. System automatically assigns project when team becomes ACTIVE
4. **Login as any team member**
5. **✅ VERIFY:** See notification: "Your team [Team Name] has been assigned a new project: [Project Title]"
6. Click on notification
7. **✅ VERIFY:** Navigates to project details page

### Test 5: Notification UI Features

1. **Multiple Notifications:**
   - Generate 5+ notifications (mix of types)
   - **✅ VERIFY:** Dropdown scrolls properly
   - **✅ VERIFY:** Each notification has correct icon color:
     - 🔵 Blue for connections
     - 🟢 Green for team/projects
     - 🟡 Yellow for messages
     - 🔴 Red for general alerts

2. **Mark All as Read:**
   - Have multiple unread notifications
   - Click "Mark all as read" button
   - **✅ VERIFY:** Badge count goes to 0
   - **✅ VERIFY:** Blue dot disappears from all notifications

3. **Time Formatting:**
   - **✅ VERIFY:** Recent notifications show "just now"
   - **✅ VERIFY:** Older ones show "2m ago", "3h ago", "2d ago"

4. **Auto-Refresh:**
   - Keep browser open
   - Wait 30 seconds
   - **✅ VERIFY:** Badge count updates automatically if new notifications arrive

## 🎯 Expected Behavior

### Notification Dropdown
- **Position:** Top-right corner, below bell icon
- **Width:** 360px
- **Max Height:** 400px with scrollbar if needed
- **Animation:** Smooth slide-down on open
- **Click Outside:** Closes dropdown

### Notification Item
- **Unread:** Light blue background + blue dot indicator
- **Read:** Default background + no dot
- **Hover:** Slightly darker background
- **Click:** Marks as read + navigates to action URL

### Badge Count
- **Shows:** Number of unread notifications
- **Updates:** Every 30 seconds automatically
- **Max Display:** Shows "9+" for 10 or more

## 🔍 Backend Endpoints Used

```
GET  /api/notifications              - Get all my notifications
GET  /api/notifications/unread       - Get only unread notifications  
GET  /api/notifications/unread/count - Get unread count
PUT  /api/notifications/{id}/read    - Mark single notification as read
PUT  /api/notifications/read-all     - Mark all as read
```

## 🐛 Troubleshooting

### Notifications not appearing?
1. Check browser console for errors
2. Verify backend is running on port 8080
3. Check MySQL notifications table: `SELECT * FROM notifications ORDER BY created_at DESC;`

### Badge count not updating?
1. Check Network tab for polling requests (every 30s)
2. Verify CORS is enabled on backend
3. Check authentication token is valid

### Notification icons wrong color?
1. Check notification type in database
2. Verify NotificationDropdown.jsx has correct type mappings

## 📝 Database Schema

```sql
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) NOT NULL,  -- CONNECTION_REQUEST, TEAM_INVITATION, etc.
    is_read BOOLEAN DEFAULT FALSE,
    action_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## ✨ Key Features

✅ Real-time updates (30s polling)
✅ LinkedIn-style dropdown UI
✅ Unread count badge
✅ Mark as read on click
✅ Mark all as read button
✅ Click outside to close
✅ Smooth animations
✅ Color-coded by type
✅ Relative time display ("2m ago")
✅ Navigation to action URL
✅ Responsive design
✅ Dark mode support

---

**Enjoy your LinkedIn-style notification system! 🎉**
