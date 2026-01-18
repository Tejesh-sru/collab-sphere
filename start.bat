@echo off
REM CollabSphere Quick Start Script for Windows

echo ================================
echo CollabSphere Quick Start
echo ================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js first.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [OK] Node.js installed
node -v
echo [OK] npm installed
npm -v
echo.

REM Check if .env exists
if not exist .env (
    echo [WARNING] .env file not found. Creating from .env.example...
    copy .env.example .env >nul
    echo [OK] .env file created. Please update with your Firebase credentials.
    echo.
)

REM Install dependencies if node_modules doesn't exist
if not exist node_modules (
    echo [INFO] Installing dependencies...
    call npm install
    echo [OK] Dependencies installed!
    echo.
) else (
    echo [OK] Dependencies already installed
    echo.
)

REM Start the development server
echo ================================
echo Starting development server...
echo ================================
echo.
echo The app will open at http://localhost:3000 (or 3001 if 3000 is in use)
echo.
echo Don't forget to:
echo   1. Update .env with your Firebase credentials
echo   2. Check BACKEND_INTEGRATION.md for backend setup
echo   3. Check DEPLOYMENT.md for deployment options
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev
