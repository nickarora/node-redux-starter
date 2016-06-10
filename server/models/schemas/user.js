import { Schema } from 'mongoose'
import transform from '../util/transform'

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
})

export default transform(UserSchema)
