import { User } from '../../models'
import LocalStrategy from 'passport-local'
import { createError } from '../../util'

const localOptions = { usernameField: 'email' }

const invalidEmailOrPassword = createError('Invalid email or password', 401)

const verifyCredentials = (user, password, next) => {
  user.comparePassword(password)
    .then(isMatch => {
      if (!isMatch) { return next(invalidEmailOrPassword) }
      return next(null, user)
    })
    .catch(_err => next(createError()))
}

const localLogin = new LocalStrategy(localOptions, (email, password, next) => {
  User.findOne({ email: email.toLowerCase() })
    .then(
      user => verifyCredentials(user, password, next),
      _err => next(invalidEmailOrPassword))
})

export default localLogin
