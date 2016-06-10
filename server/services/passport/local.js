import { User } from '../../models'
import LocalStrategy from 'passport-local'

const localOptions = { usernameField: 'email' }

const verifyCredentials = (user, password, done) => {
  if (!user) { return done(null, false) }

  user.comparePassword(password)
    .then(isMatch => {
      if (!isMatch) { return done(null, false) }
      return done(null, user)
    })
    .catch(err => done(err))
}

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email })
    .then(
      user => verifyCredentials(user, password, done),
      err => done(err)
    )
})

export default localLogin
