const User = require('../models/User.model');
const ApiError = require('../utils/ApiError');
const {
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  generateHashedToken,
  hashToken,
} = require('../utils/tokens');
const { sendVerificationEmail, sendPasswordResetEmail } = require('./email.service');
const bcrypt = require('bcryptjs');

/**
 * The service layer owns all business logic and talks directly to the
 * models. Controllers stay "dumb": parse the request, call a service,
 * shape the response. This separation is what makes the logic unit
 * -testable without spinning up Express, and reusable from other
 * entry points (e.g. a future CLI script or a GraphQL resolver).
 */

async function registerUser({ name, email, password, college }) {
  const existing = await User.findOne({ email });
  if (existing) throw ApiError.conflict('An account with this email already exists');

  const { rawToken, hashedToken } = generateHashedToken();

  const user = await User.create({
    name,
    email,
    password,
    college,
    emailVerificationTokenHash: hashedToken,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000, // 24h
  });

  // Best-effort: don't fail signup if the email provider hiccups.
  sendVerificationEmail(user.email, rawToken).catch(() => {});

  return user;
}

async function loginUser({ email, password }) {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !user.password) {
    // Same message for "no user" and "wrong password" — do not leak
    // which part was incorrect (prevents account enumeration).
    throw ApiError.unauthorized('Invalid email or password');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw ApiError.unauthorized('Invalid email or password');

  if (user.accountStatus !== 'active') {
    throw ApiError.forbidden(`Account is ${user.accountStatus}`);
  }

  const tokens = await issueTokenPair(user);
  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  return { user, ...tokens };
}

/**
 * Issues a fresh access+refresh pair and stores a HASH of the refresh
 * token on the user document. This lets us revoke a single session
 * (logout) or all sessions (e.g. after a password change) by simply
 * clearing/rotating that hash — the raw refresh token itself is never
 * persisted anywhere.
 */
async function issueTokenPair(user) {
  const accessToken = signAccessToken(user._id.toString());
  const refreshToken = signRefreshToken(user._id.toString());

  user.refreshTokenHash = hashToken(refreshToken);
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
}

async function refreshTokens(rawRefreshToken) {
  if (!rawRefreshToken) throw ApiError.unauthorized('No refresh token provided');

  let payload;
  try {
    payload = verifyRefreshToken(rawRefreshToken);
  } catch {
    throw ApiError.unauthorized('Invalid or expired refresh token');
  }

  const user = await User.findById(payload.sub).select('+refreshTokenHash');
  if (!user) throw ApiError.unauthorized('User no longer exists');

  // Rotation check: the incoming token's hash must match what we have
  // on file. If it doesn't, someone is replaying an old/stolen token —
  // invalidate the whole session as a precaution.
  const incomingHash = hashToken(rawRefreshToken);
  if (user.refreshTokenHash !== incomingHash) {
    user.refreshTokenHash = undefined;
    await user.save({ validateBeforeSave: false });
    throw ApiError.unauthorized('Refresh token reuse detected - please log in again');
  }

  return issueTokenPair(user);
}

async function logoutUser(userId) {
  await User.findByIdAndUpdate(userId, { $unset: { refreshTokenHash: 1 } });
}

async function verifyEmail(rawToken) {
  const hashedToken = hashToken(rawToken);
  const user = await User.findOne({
    emailVerificationTokenHash: hashedToken,
    emailVerificationExpires: { $gt: Date.now() },
  }).select('+emailVerificationTokenHash +emailVerificationExpires');

  if (!user) throw ApiError.badRequest('Verification link is invalid or has expired');

  user.isEmailVerified = true;
  user.emailVerificationTokenHash = undefined;
  user.emailVerificationExpires = undefined;
  await user.save({ validateBeforeSave: false });

  return user;
}

async function forgotPassword(email) {
  const user = await User.findOne({ email });
  // Always respond as if it succeeded, whether or not the email exists,
  // to prevent attackers from probing which emails are registered.
  if (!user) return;

  const { rawToken, hashedToken } = generateHashedToken();
  user.passwordResetTokenHash = hashedToken;
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save({ validateBeforeSave: false });

  await sendPasswordResetEmail(user.email, rawToken);
}

async function resetPassword(rawToken, newPassword) {
  const hashedToken = hashToken(rawToken);
  const user = await User.findOne({
    passwordResetTokenHash: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select('+passwordResetTokenHash +passwordResetExpires');

  if (!user) throw ApiError.badRequest('Reset link is invalid or has expired');

  user.password = newPassword; // re-hashed by the pre-save hook
  user.passwordResetTokenHash = undefined;
  user.passwordResetExpires = undefined;
  user.refreshTokenHash = undefined; // force re-login on all devices
  await user.save();
}

/**
 * Finds-or-creates a user from a verified Google profile. Used by the
 * Google OAuth callback route (Passport strategy calls this).
 */
async function findOrCreateGoogleUser({ googleId, email, name, avatarUrl }) {
  let user = await User.findOne({ $or: [{ googleId }, { email }] });

  if (user) {
    if (!user.googleId) {
      user.googleId = googleId;
      user.authProvider = 'google';
      user.isEmailVerified = true;
      await user.save({ validateBeforeSave: false });
    }
    return user;
  }

  user = await User.create({
    name,
    email,
    googleId,
    authProvider: 'google',
    isEmailVerified: true,
    avatarUrl: avatarUrl || '',
  });
  return user;
}

module.exports = {
  registerUser,
  loginUser,
  issueTokenPair,
  refreshTokens,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  findOrCreateGoogleUser,
};
