/* eslint-disable no-underscore-dangle */
import { Schema } from 'mongoose'
import timestamps from 'mongoose-timestamp'

const TodoSchema = new Schema({
  note: { type: String, required: true },
  complete: { type: Boolean, default: false, required: true },
})

TodoSchema.plugin(timestamps)

if (!TodoSchema.options.toJSON) {
  TodoSchema.options.toJSON = {}
}

TodoSchema.options.toJSON.transform = (doc, ret) => {
  const newRet = ret
  newRet.id = newRet._id
  delete newRet._id
  delete newRet.__v // version key
  return newRet
}


if (!TodoSchema.options.toObject) TodoSchema.options.toObject = {}
TodoSchema.options.toObject.transform = (doc, ret) => {
  const newRet = ret
  newRet.id = newRet._id
  delete newRet.__v
  return newRet
}

export default TodoSchema
