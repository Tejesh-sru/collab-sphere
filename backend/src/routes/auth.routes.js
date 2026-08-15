const express = require('express');
const rateLimit = require('express-rate-limit');
const passport = require('../config/passport');

const authController = require('../controllers/auth.controller');
const authService = require('../services/auth.service');
const validate = require('../middlewares/validate.middleware');
const { protect } = require('../middlewares/auth.middleware');
const {
  signupSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  verifyEmailSchema,
} = require('../validators/auth.validator');

const router = express.Router();

// Brute-force protection on the endpoints attackers actually target.
// Keyed by IP; in a multi-instance deployment this should back onto
// Redis (rate-limit-redis) instead of in-memory storage.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many login attempts. Try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotPasswordLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { success: false, message: 'Too many password reset requests. Try again later.' },
});

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/login', loginLimiter, validate(loginSchema), authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', protect, authController.logout);

router.get('/verify-email/:token', validate(verifyEmailSchema), authController.verifyEmail);
router.post(
  '/forgot-password',
  forgotPasswordLimiter,
  validate(forgotPasswordSchema),
  authController.forgotPassword
);
router.post(
  '/reset-password/:token',
  validate(resetPasswordSchema),
  authController.resetPassword
);

router.get('/me', protect, authController.getMe);

// ---------- Google OAuth ----------
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login?error=oauth' }),
  async (req, res) => {
    // req.user was set by the Passport strategy's `done(null, user)` call
    const { accessToken, refreshToken } = await authService.issueTokenPair(req.user);
    res.cookie('refreshToken', refreshToken, authController.refreshCookieOptions);
    // Hand the access token to the SPA via a short-lived redirect param,
    // the frontend reads it once and stores it in memory (not localStorage).
    res.redirect(`${process.env.CLIENT_URL}/oauth/callback?accessToken=${accessToken}`);
  }
);

module.exports = router;
