import { Schema } from 'mongoose'
import createModel from './createModel'

const UserSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  {
    timestamps: true,
  }
)

export const User = createModel('User', UserSchema)
