import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { User, IUser } from '../models/user'

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const API_BASE_URL = process.env.API_BASE_URL

passport.serializeUser((user: Express.User, done) => {
  done(null, (user as IUser).id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    done(null, user)
  } catch (error) {
    done(error, null)
  }
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
          let user = await User.findOne({ googleId: profile.id })

          if (!user) {
            user = await User.create({
              googleId: profile.id,
              email: profile.emails[0].value,
              name: profile.displayName,
            })
          }

          return done(null, user)
        } catch (error) {
          return done(error, null)
        }
      }
    )
  )
}

export default passport
