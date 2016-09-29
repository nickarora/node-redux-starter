import { Router } from 'express'
import { User } from '../models'
import { userToken, transformError, createError } from '../util'

import { requireSignin } from '../services/passport'

const router = new Router()

router.post('/signup', (req, res, next) => {
  const { email, password, passwordConfirmation } = req.body

  if (!email || !password) {
    return next(createError('You must provide an email and password.'))
  }

  if (password !== passwordConfirmation) {
    return next(createError('Passwords do not match.'))
  }

  User
    .create({ email: email.toLowerCase(), password })
    .then(user => res.status(200).json({
      token: userToken(user),
      success: true,
    }))
    .catch(err => next(transformError(err)))
})

router.post('/signin', requireSignin, (req, res) => {
  res.send({
    token: userToken(req.user),
    success: true,
  })
})

export default router
