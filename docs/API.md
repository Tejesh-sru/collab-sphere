# API Reference

Base URL: `/api/v1`

## Auth (implemented)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /auth/signup | No | Create account, sends verification email |
| POST | /auth/login | No | Returns { user, accessToken }, sets refreshToken cookie |
| POST | /auth/refresh | Refresh cookie | Rotates tokens |
| POST | /auth/logout | Access token | Revokes refresh token |
| GET | /auth/verify-email/:token | No | Verifies email |
| POST | /auth/forgot-password | No | Sends reset email |
| POST | /auth/reset-password/:token | No | Sets new password |
| GET | /auth/me | Access token | Returns current user |
| GET | /auth/google, /auth/google/callback | No | Google OAuth handshake |

## Planned modules
Endpoints for /users, /connections, /posts, /messages, /mentorship, /projects, /search,
/notifications, /ai, /admin will be documented here as each module is implemented — see the
root README status table and backend/src/routes/*.js stub file headers for the planned shape.
