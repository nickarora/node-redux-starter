import { createError } from '.'

const defaultValidationError = 'Invalid Field'

const usersErrors = {
  'password-string.min': 'Password must be at least 6 characters',
  'email-string.email': 'Invalid email address',
}

const transformValidationError = error => {
  const err = error.details[0]

  switch (error.tableName) {
    case 'users':
      return createError(usersErrors[`${err.path}-${err.type}`])
    default:
      return createError(defaultValidationError)
  }
}

export default transformValidationError
