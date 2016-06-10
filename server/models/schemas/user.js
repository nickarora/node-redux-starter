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

UserSchema.methods.comparePassword = function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compareAsync(candidatePassword, this.password)
      .then(resolve)
      .catch(reject)
  })
}

export default transform(UserSchema)
