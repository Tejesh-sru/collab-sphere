@echo off
echo Starting CollabSphere Application...
echo.

REM Set database environment variables
set SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/collabsphere?createDatabaseIfNotExist=true^&useSSL=false^&serverTimezone=UTC^&allowPublicKeyRetrieval=true
set SPRING_DATASOURCE_USERNAME=root
set SPRING_DATASOURCE_PASSWORD=Teju@chess123

REM Start backend in a new window
echo Starting backend server...
start "CollabSphere Backend" cmd /k "cd backend && java -jar target\collabsphere-backend-1.0.0.jar"

REM Wait a bit for backend to start
timeout /t 5 /nobreak

REM Start frontend in a new window
echo Starting frontend server...
start "CollabSphere Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend will be available at: http://localhost:8080/api
echo Frontend will be available at: http://localhost:3000
echo.
pause
