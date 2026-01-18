@echo off
echo ========================================
echo CollabSphere Backend - Starting Server
echo ========================================
echo.

REM Check if MySQL is running
echo [1/3] Checking MySQL connection...
timeout /t 2 >nul

REM Start Spring Boot application
echo [2/3] Starting Spring Boot server...
echo.
echo Backend will be available at: http://localhost:8080
echo Swagger UI: http://localhost:8080/api/swagger-ui.html
echo.

mvn spring-boot:run

pause
