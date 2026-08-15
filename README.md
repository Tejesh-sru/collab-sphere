# CollabSphere — Full Project Scaffold

A monorepo containing the `backend` (Node/Express/MongoDB) and `frontend` (React/Vite/Redux
Toolkit) for CollabSphere, an AI-powered student networking, mentorship, and collaboration
platform.

## Status

✅ = fully implemented and working
🧱 = scaffold placeholder (folder/file exists, matches the intended structure, not yet built)

| Module | Backend | Frontend |
|---|---|---|
| Authentication (signup/login/JWT/OAuth/verify/reset) | ✅ | ✅ |
| Student Profile | 🧱 | 🧱 |
| Feed (posts/likes/comments/shares) | 🧱 | 🧱 |
| Networking (follow/connections) | 🧱 | 🧱 |
| Messaging (1:1 + group chat) | 🧱 (Socket.io skeleton ✅) | 🧱 |
| Mentorship | 🧱 | 🧱 |
| Project Collaboration (Kanban) | 🧱 | 🧱 |
| Search | 🧱 | 🧱 |
| Notifications | 🧱 | 🧱 |
| AI Recommendations / Resume Analysis / Chatbot | 🧱 | 🧱 |
| Admin Panel | 🧱 | 🧱 |

Every 🧱 file has a header comment describing exactly what it will contain and which existing
file to use as its pattern (almost always the Auth module). None of the 🧱 backend routers are
wired into `app.js` yet — only `/api/v1/auth` is mounted — so the server runs cleanly out of the
box without 404-by-design routes pretending to work.

## Getting started

### Backend
```bash
cd backend
cp .env.example .env   # fill in MongoDB URI, JWT secrets, SMTP, Google OAuth, Cloudinary
npm install
npm run dev             # nodemon server.js, http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

Full details on the Authentication module (concept/why/how/schema/API flow/deployment/mistakes)
are in `backend/MENTOR_NOTES.md`.

## What to build next

Tell me which module from the table above to implement next and it will get the full treatment:
concept, why, how, folder structure (already scaffolded), production-ready code, file-by-file and
function-by-function explanation, API flow, DB schema, frontend/backend/auth flow, deployment
notes, common mistakes, and suggested improvements — same as Auth.
