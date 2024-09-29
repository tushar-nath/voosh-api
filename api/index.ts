import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import session from 'express-session'
import { createServer } from 'http'
import authRoutes from '../routes/authRoutes'
import passport from 'passport'

dotenv.config()

const app = express()

// Set up sessions to store user data
app.use(
  session({
    secret: 'voosh-session',
    resave: true,
    saveUninitialized: true,
  })
)

const corsOptions = {
  // TODO: Only allow all origins when running locally but restrict in production
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json({ limit: '10mb' }))
app.use(passport.initialize())
app.use(passport.session())

app.get('/api/healthcheck', (_req, res) => {
  res.status(200).json({ message: 'Server is up and running' })
})
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 8000
const httpServer = createServer(app)

httpServer.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`)
})

process.on('SIGTERM', close)
process.on('SIGINT', close)

function close() {
  console.log('Shutting down gracefully')
  process.exit(0)
}

export default app
