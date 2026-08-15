const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');
const authService = require('../services/auth.service');

// Cookie options for the refresh token. httpOnly => invisible to JS
// (mitigates XSS token theft). sameSite=strict + secure in production
// mitigates CSRF on the refresh endpoint.
const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days, keep in sync with JWT_REFRESH_EXPIRES_IN
  path: '/api/v1/auth', // only sent to auth routes, not every request
};

const signup = asyncHandler(async (req, res) => {
  const user = await authService.registerUser(req.body);
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user },
        'Account created. Please check your email to verify your address.'
      )
    );
});

const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  res.status(200).json(new ApiResponse(200, { user, accessToken }, 'Logged in successfully'));
});

const refresh = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken } = await authService.refreshTokens(
    req.cookies.refreshToken
  );

  res.cookie('refreshToken', refreshToken, refreshCookieOptions);
  res.status(200).json(new ApiResponse(200, { accessToken }, 'Token refreshed'));
});

const logout = asyncHandler(async (req, res) => {
  if (req.user) await authService.logoutUser(req.user._id);
  res.clearCookie('refreshToken', { path: '/api/v1/auth' });
  res.status(200).json(new ApiResponse(200, null, 'Logged out successfully'));
});

const verifyEmail = asyncHandler(async (req, res) => {
  await authService.verifyEmail(req.params.token);
  res.status(200).json(new ApiResponse(200, null, 'Email verified successfully'));
});

const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        'If an account with that email exists, a reset link has been sent.'
      )
    );
});

const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.params.token, req.body.password);
  res.status(200).json(new ApiResponse(200, null, 'Password reset successfully. Please log in.'));
});

const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, { user: req.user }));
});

module.exports = {
  signup,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  getMe,
  refreshCookieOptions,
};
