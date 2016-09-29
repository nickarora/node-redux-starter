import User from '../../models/User'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { userToken, createError } from '../../util'

const invalidToken = createError('Invalid Token', 401)

const jwtOptions = {
  jwtFromRequest: req => {
    const { authorization } = req.headers
    const nullToken = userToken({ attributes: { id: null } })
    return authorization === 'null' ? nullToken : authorization
  },
  secretOrKey: process.env.AUTH_KEY,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, next) => {
  if (!payload.sub) {
    return next(invalidToken)
  }

  User.findById(payload.sub, { require: true })
    .then(user => next(null, user))
    .catch(_err => next(invalidToken))
})

export default jwtLogin
