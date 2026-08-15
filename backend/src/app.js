const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/auth.routes');
const { errorMiddleware, notFoundMiddleware } = require('./middlewares/error.middleware');

const app = express();

// Trust the first proxy hop (Render/Vercel sit behind a load balancer) -
// required for req.ip and secure cookies to behave correctly.
app.set('trust proxy', 1);

// ---------- Security middleware ----------
app.use(helmet()); // sensible security headers (CSP, X-Frame-Options, etc.)
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, // allow the refresh-token cookie to be sent
  })
);
app.use(hpp()); // guards against HTTP parameter pollution

// ---------- Body / cookie parsing ----------
app.use(express.json({ limit: '10kb' })); // small limit - large payloads (files) go via Multer/Cloudinary, not JSON
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());
app.use(mongoSanitize()); // strips $ and . from user input to prevent NoSQL injection

// ---------- Logging ----------
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ---------- Global rate limit (defense in depth beyond per-route limits) ----------
app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

// ---------- Health check (used by Render/uptime monitors) ----------
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

// ---------- API routes ----------
const API_PREFIX = '/api/v1';
app.use(`${API_PREFIX}/auth`, authRoutes);
// Additional routers are mounted here as they are built, e.g.:
// app.use(`${API_PREFIX}/users`, userRoutes);
// app.use(`${API_PREFIX}/posts`, postRoutes);
// app.use(`${API_PREFIX}/connections`, connectionRoutes);
// app.use(`${API_PREFIX}/messages`, messageRoutes);
// app.use(`${API_PREFIX}/mentorship`, mentorshipRoutes);
// app.use(`${API_PREFIX}/projects`, projectRoutes);
// app.use(`${API_PREFIX}/search`, searchRoutes);
// app.use(`${API_PREFIX}/notifications`, notificationRoutes);
// app.use(`${API_PREFIX}/ai`, aiRoutes);
// app.use(`${API_PREFIX}/admin`, adminRoutes);

app.use(notFoundMiddleware);
app.use(errorMiddleware); // must be registered LAST

module.exports = app;
