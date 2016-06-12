import { Router } from 'express'
import { User } from '../models'
import { userToken, validateEmail } from '../util'

import { requireSignin } from '../services/passport'

const router = new Router()

router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  if (!email || !password) {
    res.status(422).send({ message: 'You must provide an email and password.' })
  }

  if (password.length < 6) {
    res.status(422).send({ message: 'Password must be at least 6 characters.' })
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
