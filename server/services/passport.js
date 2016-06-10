import { User } from '../models'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SK_API_KEY,
}

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload.sub)
    .then(
      user => {
        if (!user) return done(null, false)
        return done(null, user)
      },
      err => done(err, false)
    )
})

export default jwtLogin
