import { Strategy as GoogleTokenStrategy } from 'passport-google-token';
import passport from 'passport';


const GoogleTokenStrategyCallback = (accessToken, refreshToken, profile, done) => done(null, {
  accessToken,
  refreshToken,
  profile,
});

passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
}, GoogleTokenStrategyCallback));

// eslint-disable-next-line import/prefer-default-export
export const authenticateGoogle = (req, res) => new Promise((resolve, reject) => {
  passport.authenticate('google-token', { session: false }, (err, data, info) => {
    if (err) reject(err);
    resolve({ data, info });
  })(req, res);
});
