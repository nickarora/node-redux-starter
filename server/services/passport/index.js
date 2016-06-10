import jwtStrategy from './jwt'
import localStrategy from './local'
import passport from 'passport'

passport.use(jwtStrategy)
passport.use(localStrategy)

export const requireAuth = passport.authenticate('jwt', { session: false })
export const requireSignin = passport.authenticate('local', { session: false })

export default passport
