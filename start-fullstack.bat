@echo off
echo ================================
echo CollabSphere Full Stack Launcher
echo ================================
echo.

echo Starting Backend Server...
echo.
cd backend
start cmd /k "mvn spring-boot:run"

timeout /t 5 /nobreak > nul

echo Starting Frontend Development Server...
echo.
cd ..
start cmd /k "npm run dev"

echo.
echo ================================
echo Both servers are starting!
echo ================================
echo.
echo Backend:  http://localhost:8080/api
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit this window...
pause > nul
