import { Router } from 'express'
import { User } from '../models'
import { userToken, validateEmail } from '../util'

import jwtStrategy from '../services/passport/jwt'
import localStrategy from '../services/passport/local'
import passport from 'passport'
passport.use(jwtStrategy)
passport.use(localStrategy)
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

const router = new Router()

router.get('/test', requireAuth, (req, res) => {
  res.send({ message: 'you are authenticated!' })
})

router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(422).send({ message: 'You must provide an email and password.' })
  }

  if (!validateEmail(email)) {
    res.status(422).send({ message: 'You must provide a valid email address.' })
  }

  const signup = existingUser => {
    if (existingUser) {
      res.status(422).send({ message: 'Email is already in use.' })
    }

    const newUser = new User({
      email,
      password,
    })

    newUser.save()
      .then(
        user => res.status(200).json({
          token: userToken(user),
          success: true,
        }),
        err => next(err)
      )
  }

  User.findOne({ email })
    .then(
      existingUser => signup(existingUser),
      err => next(err)
    )
})

router.post('/signin', requireSignin, (req, res) => {
  res.send({
    token: userToken(req.user),
    success: true,
  })
})

export default router
