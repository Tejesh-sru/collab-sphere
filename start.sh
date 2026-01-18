#!/bin/bash

# CollabSphere Quick Start Script

echo "🚀 CollabSphere Quick Start"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "✅ .env file created. Please update with your Firebase credentials."
    echo ""
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
else
    echo "✅ Dependencies already installed"
    echo ""
fi

# Start the development server
echo "🚀 Starting development server..."
echo "   The app will open at http://localhost:3000 (or 3001 if 3000 is in use)"
echo ""
echo "📝 Don't forget to:"
echo "   1. Update .env with your Firebase credentials"
echo "   2. Check BACKEND_INTEGRATION.md for backend setup"
echo "   3. Check DEPLOYMENT.md for deployment options"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
