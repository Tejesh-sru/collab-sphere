@echo off
echo ========================================
echo CollabSphere - Starting Services
echo ========================================
echo.

REM Kill any existing Java processes
echo [1/4] Stopping existing backend processes...
taskkill /F /IM java.exe 2>nul
timeout /t 2 /nobreak >nul

REM Start MySQL (if not running)
echo [2/4] Checking MySQL...
sc query MySQL80 | find "RUNNING" >nul
if %errorlevel% neq 0 (
    echo MySQL is not running. Starting MySQL...
    net start MySQL80
) else (
    echo MySQL is already running.
)

REM Start Backend
echo.
echo [3/4] Starting Backend Server...
echo Backend is starting on http://localhost:8080
echo Please wait 20 seconds...
start "CollabSphere Backend" /MIN cmd /c "cd backend && java -jar target\collabsphere-backend-1.0.0.jar"
timeout /t 20 /nobreak

REM Test backend
echo.
echo [4/4] Testing Backend Connection...
curl -s http://localhost:8080/api/actuator/health >nul 2>&1
if %errorlevel% equ 0 (
    echo Backend is responding!
) else (
    echo Warning: Backend may still be starting...
)

echo.
echo ========================================
echo Backend Started!
echo ========================================
echo.
echo Backend URL: http://localhost:8080/api
echo.
echo To start the frontend, run:
echo   npm run dev
echo.
echo Press any key to exit...
pause >nul
