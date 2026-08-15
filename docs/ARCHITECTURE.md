# Architecture Decisions

- **Layered backend (route -> controller -> service -> model)**: keeps business logic testable
  and reusable outside of Express (see backend/MENTOR_NOTES.md for the full rationale).
- **JWT access (15m, memory) + refresh (30d, httpOnly cookie) with rotation & reuse detection**:
  minimizes blast radius of a leaked token; see backend/MENTOR_NOTES.md section 12.
- **Feature-folder frontend, not type-folder**: features/<name>/ holds its slice + RTK Query api +
  components together, so removing a feature means deleting one folder.
- **RTK Query over hand-written thunks**: auto-caching/loading/error states once we have 20+
  endpoints across 10 feature domains.
- **Vite over CRA**: faster dev server, smaller config surface, matches the requested stack
  (the previously-uploaded collabsphere-react/ folder was CRA and has been retired).
- **One User document holds both auth and profile fields**: they're always read together; see
  backend/src/models/User.model.js header comment for when to promote a sub-document to its own
  collection instead (e.g. if a user could have thousands of projects).
