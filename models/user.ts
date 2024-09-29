import mongoose, { Document, Schema } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  email: string
  password?: string
  name?: string
  googleId?: string
  comparePassword(candidatePassword: string): Promise<boolean>
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  name: { type: String },
  googleId: { type: String },
})

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password!, 10)
  }
  next()
})

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password)
}

export const User = mongoose.model<IUser>('User', UserSchema)
