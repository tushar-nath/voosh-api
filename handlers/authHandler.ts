import { Request, Response } from 'express'
import { loginUser, signupUser } from '../services/authService'

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await loginUser(email, password)
    res.status(200).json({ user })
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body
    const user = await signupUser(email, password)
    res.status(201).json({ user })
  } catch (error) {
    res.status(400).json({ error: (error as Error).message })
  }
}

export const googleCallback = (_req: Request, res: Response): void => {
  res.redirect('/dashboard')
}
