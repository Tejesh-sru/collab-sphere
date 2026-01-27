# 🌐 CollabSphere – Student Networking & Mentorship Platform  
### Complete Full-Stack Application
🌸 Project Description

CollabSphere is a student-focused networking and mentorship platform designed to bring learners, innovators, and aspiring professionals together in one collaborative space. Inspired by professional networking platforms, CollabSphere enables students to build meaningful connections, showcase their projects, exchange ideas, and grow together. With a clean user experience and secure backend architecture, the platform encourages collaboration, learning, and personal development in a supportive digital environment.
---

## ✅ Project Status

### 🔧 Backend: **READY**
### 🎨 Frontend: **READY (Integration Pending)**

---

## 🧩 Tech Stack

### Backend
- **Java 17**
- **Spring Boot 3.2.1**
- **Spring Security + JWT**
- **MySQL 8**
- **Hibernate / JPA**
- **Swagger / OpenAPI**

### Frontend
- **React 18**
- **Vite**
- **Bootstrap 5**
- **Context API**
- **Axios**

---

## 🎯 What’s Been Built

### 🔙 Backend (Spring Boot + MySQL)
- ✅ JWT Authentication & Authorization
- ✅ 5 Entity Models  
  - User  
  - Connection  
  - Project  
  - Message  
  - Notification  
- ✅ 5 JPA Repositories with custom queries
- ✅ 6 Service classes (business logic)
- ✅ 6 REST Controllers (50+ endpoints)
- ✅ Global Exception Handling
- ✅ CORS Configuration for frontend
- ✅ Swagger API Documentation
- ✅ Successfully Compiled & Tested

---

### 🎨 Frontend (React + Vite)
- ✅ 11 Reusable UI Components
- ✅ 7 Complete Pages
- ✅ Dark / Light Theme
- ✅ Demo Mode enabled
- ✅ Mock API for testing
- ⬜ Backend integration pending

---

## 🚀 Quick Start Guide

### ✅ Prerequisites
- Java 17
- Maven
- Node.js & npm
- MySQL 8.0 (must be running)

---

## 🗄️ Step 1: Setup MySQL Database

```sql
CREATE DATABASE collabsphere;
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
cd backend
./start-backend.bat
Backend URL: http://localhost:8080

Swagger UI: http://localhost:8080/api/swagger-ui.html
VITE_DEMO_MODE=false
VITE_API_BASE_URL=http://localhost:8080/api
npm run dev
Frontend URL: http://localhost:3001
Architecture Overview
Frontend (React + Vite)
│
│ REST API (JSON)
▼
Backend (Spring Boot)
│
│ JPA / Hibernate
▼
MySQL Database


Project Structure
collabsphere/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── contexts/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── utils/
│   └── vite.config.js
│
└── backend/
    ├── src/main/java/com/collabsphere/
    │   ├── config/
    │   ├── controller/
    │   ├── dto/
    │   ├── exception/
    │   ├── model/
    │   ├── repository/
    │   ├── security/
    │   └── service/
    ├── pom.xml
    ├── README.md
    └── start-backend.bat
API Endpoints
🔐 Authentication
POST /api/auth/register
POST /api/auth/login
👤 Users
GET  /api/users/me
PUT  /api/users/me
GET  /api/users/{id}
GET  /api/users/search

🤝 Connections
POST /api/connections/send/{userId}
PUT  /api/connections/{id}/accept
PUT  /api/connections/{id}/reject
GET  /api/connections/my
📁 Projects
POST   /api/projects
GET    /api/projects/{id}
PUT    /api/projects/{id}
DELETE /api/projects/{id}
💬 Messages
POST /api/messages
GET  /api/messages/conversation/{id}
GET  /api/messages/unread
🔔 Notifications
GET /api/notifications
PUT /api/notifications/{id}/read

Testing APIs
Register
POST /api/auth/register
{
  "email": "test@example.com",
  "password": "password123",
  "displayName": "Test User"
}
Login
POST /api/auth/login
{
  "email": "test@example.com",
  "password": "password123"
}

🌟 Conclusion

CollabSphere represents a step toward empowering students through technology-driven collaboration and mentorship. By combining secure authentication, seamless communication, and project showcasing in a single platform, it creates opportunities for students to connect, learn, and grow beyond classroom boundaries. The platform is scalable, future-ready, and built with real-world usability in mind, making it a strong foundation for a modern student networking ecosystem.
