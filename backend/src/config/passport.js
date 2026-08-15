const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const authService = require('../services/auth.service');

/**
 * We use Passport ONLY to handle the Google OAuth handshake
 * (redirect -> consent -> callback with a verified profile). We do
 * NOT use Passport sessions — CollabSphere is a stateless JWT API, so
 * `session: false` is set wherever this strategy is invoked in routes.
 */
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await authService.findOrCreateGoogleUser({
          googleId: profile.id,
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          avatarUrl: profile.photos?.[0]?.value,
        });
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
