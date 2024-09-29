import clientPromise from '../config/database'
import { User, IUser } from '../models/user'
import jwt from 'jsonwebtoken'

export const loginUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  await clientPromise
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('User not found')
  }

  const isMatch = await user.comparePassword(password)
  if (!isMatch) {
    throw new Error('Invalid credentials')
  }

  return user
}

export const signupUser = async (
  email: string,
  password: string
): Promise<IUser> => {
  await clientPromise
  const existingUser = await User.findOne({ email })
  if (existingUser) {
    throw new Error('User already exists')
  }

  const user = new User({ email, password })
  await user.save()

  return user
}

export const generateToken = (user: IUser): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT secret is not defined')
  }
  return jwt.sign({ id: user.id }, secret, { expiresIn: '7d' })
}
