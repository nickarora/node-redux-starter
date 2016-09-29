/* eslint-disable func-names, object-shorthand */
import db from '../config/pgDb'
import Joi from 'joi'
import Promise from 'bluebird'
import bcryptNode from 'bcrypt-nodejs'

const bcrypt = Promise.promisifyAll(bcryptNode)
const SALT_ROUNDS = 10

const User = db.Model.extend({
  tableName: 'users',

  validate: {
    email: Joi.string().email(),
    password: Joi.string().min(6),
  },

  initialize: function() {
    this.on('saving', this.hashPassword)
  },

  hashPassword: (model, attrs, _options) => {
    if (!model.hasChanged('password')) return

    const password = model.get('password')

    return bcrypt.genSaltAsync(SALT_ROUNDS)
      .then(salt => bcrypt.hashAsync(password, salt, null))
      .then(hash => model.set('password', hash))
  },

  comparePassword: function(candidatePassword) {
    const password = this.get('password')
    return bcrypt.compareAsync(candidatePassword, password)
  },
}, {
  findByEmail: function(email, options) {
    return this.forge({ email }).fetch(options)
  },
})

export default db.model('User', User)
