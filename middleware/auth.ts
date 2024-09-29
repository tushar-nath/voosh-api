import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user'
import { AuthRequest } from '../types'

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  try {
    const secret = process.env.JWT_SECRET
    if (!secret) {
      throw new Error('JWT secret is not defined')
    }

    const decoded = jwt.verify(token, secret) as { id: string }
    const user = await User.findById(decoded.id)

    if (!user) {
      res.status(401).json({ error: 'Unauthorized' })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' })
  }
}
