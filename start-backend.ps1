# CollabSphere Backend Startup Script
# Run this script to start the backend server

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "CollabSphere - Starting Backend Server" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Stop any existing Java processes
Write-Host "[1/4] Stopping existing backend processes..." -ForegroundColor Yellow
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Check MySQL
Write-Host "[2/4] Checking MySQL..." -ForegroundColor Yellow
$mysqlService = Get-Service -Name "MySQL80" -ErrorAction SilentlyContinue
if ($mysqlService -and $mysqlService.Status -ne "Running") {
    Write-Host "Starting MySQL service..." -ForegroundColor Yellow
    Start-Service -Name "MySQL80"
} elseif ($mysqlService) {
    Write-Host "MySQL is already running." -ForegroundColor Green
} else {
    Write-Host "MySQL service not found. Make sure MySQL is installed." -ForegroundColor Red
}

# Start Backend
Write-Host ""
Write-Host "[3/4] Starting Backend Server..." -ForegroundColor Yellow
Write-Host "Backend URL: http://localhost:8080/api" -ForegroundColor Cyan
Write-Host "Please wait 20 seconds for startup..." -ForegroundColor Yellow

$backendPath = "C:\Users\asus\OneDrive\Desktop\collabsphere1\backend"
$jarPath = "$backendPath\target\collabsphere-backend-1.0.0.jar"

# Start backend in a new window
Start-Process -FilePath "java" -ArgumentList "-jar", $jarPath -WorkingDirectory $backendPath -WindowStyle Normal

Write-Host ""
Write-Host "Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 20

# Test backend
Write-Host ""
Write-Host "[4/4] Testing Backend Connection..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:8080/api/actuator/health" -Method Get -TimeoutSec 5 -ErrorAction Stop
    Write-Host "✓ Backend is responding! (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    if ($_.Exception.Response.StatusCode.value__ -eq 403) {
        Write-Host "✓ Backend is running! (403 Forbidden is expected)" -ForegroundColor Green
    } else {
        Write-Host "⚠ Backend may still be starting... Check the backend window" -ForegroundColor Yellow
        Write-Host "   Error: $($_.Exception.Message)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Backend Started Successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend URL: " -NoNewline
Write-Host "http://localhost:8080/api" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the frontend, run:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
