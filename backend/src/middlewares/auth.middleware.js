const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const { verifyAccessToken } = require('../utils/tokens');
const User = require('../models/User.model');

/**
 * `protect` verifies the short-lived access token sent as
 * `Authorization: Bearer <token>` and attaches the authenticated user
 * to `req.user`. It deliberately does NOT touch the refresh token or
 * cookies — refreshing is handled exclusively by POST /auth/refresh.
 */
const protect = asyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    throw ApiError.unauthorized('No access token provided');
  }

  const token = header.split(' ')[1];

  let payload;
  try {
    payload = verifyAccessToken(token);
  } catch (err) {
    // Distinguish an expired token (client should try /auth/refresh)
    // from a genuinely invalid/tampered one.
    if (err.name === 'TokenExpiredError') {
      throw new ApiError(401, 'Access token expired', [], true);
    }
    throw ApiError.unauthorized('Invalid access token');
  }

  const user = await User.findById(payload.sub);
  if (!user) throw ApiError.unauthorized('User no longer exists');
  if (user.accountStatus !== 'active') {
    throw ApiError.forbidden(`Account is ${user.accountStatus}`);
  }

  req.user = user;
  next();
});

/**
 * `authorize('admin', 'mentor')` restricts a route to specific roles.
 * Must be used AFTER `protect`.
 */
const authorize =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!req.user) throw ApiError.unauthorized('Not authenticated');
    if (!allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden('You do not have permission to perform this action');
    }
    next();
  };

module.exports = { protect, authorize };
