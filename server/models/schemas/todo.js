import { Schema } from 'mongoose'
import transform from '../util/transform'

const TodoSchema = new Schema({
  note: { type: String, required: true },
  complete: { type: Boolean, default: false, required: true },
}, {
  timestamps: true,
})

export default transform(TodoSchema)
