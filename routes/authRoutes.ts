import express from 'express'
import { login, signup, googleCallback } from '../handlers/authHandler'
import passport from '../config/passport'

const router = express.Router()

router.post('/login', login)
router.post('/signup', signup)
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  googleCallback
)

export default router
