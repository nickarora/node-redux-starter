import { Router } from 'express'
import User from '../models/User'
import { userToken, validateEmail } from '../util'

import { requireSignin } from '../services/passport'

const router = new Router()

router.post('/signup', (req, res, next) => {
  let { email } = req.body
  const { password } = req.body

  if (!email || !password) {
    res.status(422).send({ message: 'You must provide an email and password.' })
  }

  if (password.length < 6) {
    res.status(422).send({ message: 'Password must be at least 6 characters.' })
  }

  if (!validateEmail(email)) {
    res.status(422).send({ message: 'You must provide a valid email address.' })
  }

  const signup = foundUser => {
    if (foundUser) {
      res.status(422).send({ message: 'Email is already in use.' })
    }

    User
      .create({ email, password })
      .then(user => res.status(200).json({
        token: userToken(user),
        success: true,
      }))
      .catch(err => next(err))
  }

  email = email.toLowerCase()

  User.findByEmail(email)
    .then(
      foundUser => signup(foundUser),
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
