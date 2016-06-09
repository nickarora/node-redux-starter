import mongoose from 'mongoose'
import TodoSchema from './schemas/todo'
import UserSchema from './schemas/user'

export const Todo = mongoose.model('Todo', TodoSchema)
export const User = mongoose.model('User', UserSchema)
