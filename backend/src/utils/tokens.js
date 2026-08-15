const jwt = require('jsonwebtoken');
const crypto = require('crypto');

/**
 * Signs a short-lived ACCESS token. Sent to the client and attached to
 * every request as `Authorization: Bearer <token>`. Kept short-lived
 * (15m) so a leaked token has a small blast radius.
 */
function signAccessToken(userId) {
  return jwt.sign({ sub: userId, type: 'access' }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m',
  });
}

/**
 * Signs a long-lived REFRESH token. Stored in an httpOnly, secure,
 * sameSite cookie — never exposed to JS on the client — and used only
 * to mint new access tokens via /auth/refresh.
 */
function signRefreshToken(userId) {
  return jwt.sign({ sub: userId, type: 'refresh' }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d',
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

/**
 * Generates a random, URL-safe token plus its SHA-256 hash.
 * We store only the HASH in the database (email verification / password
 * reset), and email the RAW token to the user. This means a database
 * leak alone can never be used to verify an account or reset a password.
 */
function generateHashedToken() {
  const rawToken = crypto.randomBytes(32).toString('hex');
  const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
  return { rawToken, hashedToken };
}

function hashToken(rawToken) {
  return crypto.createHash('sha256').update(rawToken).digest('hex');
}

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
  generateHashedToken,
  hashToken,
};
