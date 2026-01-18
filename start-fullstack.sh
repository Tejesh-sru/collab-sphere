#!/bin/bash

echo "================================"
echo "CollabSphere Full Stack Launcher"
echo "================================"
echo ""

echo "Starting Backend Server..."
echo ""
cd backend
gnome-terminal -- bash -c "mvn spring-boot:run; exec bash" &

sleep 5

echo "Starting Frontend Development Server..."
echo ""
cd ..
gnome-terminal -- bash -c "npm run dev; exec bash" &

echo ""
echo "================================"
echo "Both servers are starting!"
echo "================================"
echo ""
echo "Backend:  http://localhost:8080/api"
echo "Frontend: http://localhost:5173"
echo ""
