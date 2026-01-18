# CollabSphere Backend API

Spring Boot backend for CollabSphere - Student Networking & Mentorship Platform

## 🚀 Tech Stack

- **Java**: 17
- **Spring Boot**: 3.2.1
- **Database**: MySQL
- **Security**: Spring Security + JWT
- **Build Tool**: Maven
- **Documentation**: Swagger/OpenAPI

## 📋 Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+
- Git

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Configure MySQL Database

Create a MySQL database:

```sql
CREATE DATABASE collabsphere;
```

### 3. Update Application Properties

Edit `src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/collabsphere
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

### 4. Install Dependencies

```bash
mvn clean install
```

### 5. Run the Application

```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

## 📚 API Documentation

Once the application is running, access:

- **Swagger UI**: http://localhost:8080/api/swagger-ui.html
- **API Docs**: http://localhost:8080/api/api-docs

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Users

- `GET /api/users/me` - Get current user profile
- `GET /api/users/{userId}` - Get user by ID
- `PUT /api/users/me` - Update current user profile
- `GET /api/users/search?q={query}` - Search users
- `GET /api/users/filter/skills?skills={skills}` - Filter users by skills

### Connections

- `POST /api/connections/send/{receiverId}` - Send connection request
- `PUT /api/connections/{connectionId}/accept` - Accept connection request
- `PUT /api/connections/{connectionId}/reject` - Reject connection request
- `GET /api/connections/pending` - Get pending requests
- `GET /api/connections/my` - Get my connections
- `GET /api/connections/count` - Get connection count

### Projects

- `POST /api/projects` - Create project
- `PUT /api/projects/{projectId}` - Update project
- `DELETE /api/projects/{projectId}` - Delete project
- `GET /api/projects/{projectId}` - Get project by ID
- `GET /api/projects/my` - Get my projects
- `GET /api/projects/user/{userId}` - Get user's projects
- `GET /api/projects/search?q={query}` - Search projects

### Messages

- `POST /api/messages` - Send message
- `GET /api/messages/conversation/{userId}` - Get conversation
- `PUT /api/messages/{messageId}/read` - Mark message as read
- `GET /api/messages/unread` - Get unread messages
- `GET /api/messages/unread/count` - Get unread message count
- `GET /api/messages/conversations` - Get conversation partners

### Notifications

- `GET /api/notifications` - Get all notifications
- `GET /api/notifications/unread` - Get unread notifications
- `PUT /api/notifications/{notificationId}/read` - Mark as read
- `PUT /api/notifications/read-all` - Mark all as read
- `GET /api/notifications/unread/count` - Get unread count

## 🔐 Authentication

The API uses JWT (JSON Web Token) for authentication.

### How to Use:

1. **Register or Login** to get a JWT token
2. **Include the token** in the `Authorization` header:

```
Authorization: Bearer YOUR_JWT_TOKEN
```

## 📦 Project Structure

```
src/main/java/com/collabsphere/
├── config/              # Configuration classes
│   ├── CorsConfig.java
│   └── SecurityConfig.java
├── controller/          # REST Controllers
│   ├── AuthController.java
│   ├── UserController.java
│   ├── ConnectionController.java
│   ├── ProjectController.java
│   ├── MessageController.java
│   └── NotificationController.java
├── dto/                 # Data Transfer Objects
│   ├── LoginRequest.java
│   ├── RegisterRequest.java
│   ├── AuthResponse.java
│   ├── UserDTO.java
│   └── ...
├── exception/           # Exception handlers
│   └── GlobalExceptionHandler.java
├── model/               # Entity models
│   ├── User.java
│   ├── Connection.java
│   ├── Project.java
│   ├── Message.java
│   └── Notification.java
├── repository/          # JPA Repositories
│   ├── UserRepository.java
│   ├── ConnectionRepository.java
│   └── ...
├── security/            # Security components
│   ├── JwtTokenProvider.java
│   ├── JwtAuthenticationFilter.java
│   └── CustomUserDetailsService.java
├── service/             # Business logic
│   ├── AuthService.java
│   ├── UserService.java
│   ├── ConnectionService.java
│   └── ...
└── CollabSphereApplication.java
```

## 🧪 Testing

Run tests with:

```bash
mvn test
```

## 📝 Environment Variables

Key configurations in `application.properties`:

- `server.port` - Server port (default: 8080)
- `spring.datasource.url` - Database URL
- `spring.datasource.username` - Database username
- `spring.datasource.password` - Database password
- `jwt.secret` - JWT secret key
- `jwt.expiration` - JWT expiration time (milliseconds)

## 🚢 Deployment

### Build for Production

```bash
mvn clean package
```

This creates a JAR file in `target/` directory.

### Run the JAR

```bash
java -jar target/collabsphere-backend-1.0.0.jar
```

## 🔧 Troubleshooting

### Database Connection Issues

- Ensure MySQL is running
- Check database credentials in `application.properties`
- Verify database exists: `SHOW DATABASES;`

### Port Already in Use

Change the port in `application.properties`:

```properties
server.port=8081
```

### JWT Errors

- Ensure `jwt.secret` is set in `application.properties`
- Token must be included in Authorization header
- Check token expiration

## 📖 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
- [JWT](https://jwt.io/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

## 👥 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For issues and questions, please create an issue in the repository.

---

**Built with ❤️ using Spring Boot**
