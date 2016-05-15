import mongoose from 'mongoose'
import TodoSchema from './schemas/todo'

export const Todo = mongoose.model('Todo', TodoSchema)
