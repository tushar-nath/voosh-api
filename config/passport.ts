import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const API_BASE_URL = process.env.API_BASE_URL

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (obj, done) {
  done(null, obj as any)
})

if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: `${API_BASE_URL}/api/auth/google/callback`,
        scope: ['profile', 'email'],
      },
      async function (
        _accessToken: string,
        _refreshToken: string,
        profile: any,
        done: any
      ) {
        try {
          console.info("user's google profile: ", profile)
          return done(null)
        } catch (error) {
          return done(error, null)
        }
      }
    )
  )
}

export default passport
