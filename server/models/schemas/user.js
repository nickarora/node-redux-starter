/* eslint-disable func-names */
import { Schema } from 'mongoose'
import transform from '../util/transform'
import Promise from 'bluebird'
import bcryptNode from 'bcrypt-nodejs'

const bcrypt = Promise.promisifyAll(bcryptNode)
const SALT_ROUNDS = 10

const UserSchema = new Schema({
  email: { type: String, unique: true, lowercase: true, required: true },
  password: { type: String, required: true },
}, {
  timestamps: true,
})

UserSchema.pre('save', function(next) {
  bcrypt.genSaltAsync(SALT_ROUNDS)
    .then(salt => bcrypt.hashAsync(this.password, salt, null))
    .then(hash => {
      this.password = hash
      next()
    })
    .catch(err => next(err))
})

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err) }
    return callback(null, isMatch)
  })
}

export default transform(UserSchema)
