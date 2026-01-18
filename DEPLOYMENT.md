# CollabSphere Deployment Guide

## 🚀 Deployment Options

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Environment Variables**
   - Add your Firebase config in Vercel dashboard
   - Go to Settings > Environment Variables
   - Add all variables from `.env.example`

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Deploy**
   ```bash
   netlify deploy --prod --dir=dist
   ```

4. **Environment Variables**
   - Add in Netlify dashboard under Site settings > Environment variables

### Option 3: GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install -D gh-pages
   ```

2. **Add to package.json scripts**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

## 🔧 Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 🔐 Environment Variables for Production

Create environment variables in your deployment platform:

```env
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_domain
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_production_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_sender_id
VITE_FIREBASE_APP_ID=your_production_app_id
VITE_API_BASE_URL=https://your-backend-api.com/api
```

## 📊 Performance Optimization

The build is already optimized with:
- Code splitting
- Tree shaking
- Minification
- Asset optimization
- Lazy loading of routes

## 🔍 Monitoring

Recommended monitoring services:
- **Vercel Analytics** (if deployed on Vercel)
- **Google Analytics**
- **Sentry** for error tracking
- **LogRocket** for session replay

## ✅ Pre-deployment Checklist

- [ ] Update Firebase config with production credentials
- [ ] Set correct API_BASE_URL for production backend
- [ ] Test all authentication flows
- [ ] Verify all routes work correctly
- [ ] Test responsive design on multiple devices
- [ ] Run production build locally and test
- [ ] Set up proper error boundaries
- [ ] Configure CORS on backend
- [ ] Enable HTTPS
- [ ] Set up CDN for assets (if needed)
