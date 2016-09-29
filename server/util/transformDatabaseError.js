import { createError } from '.'

const usersErrors = {
  23505: 'Email is already in use.',
}

const transformValidationError = error => {
  switch (error.table) {
    case 'users':
      return createError(usersErrors[error.code])
    default:
      return createError()
  }
}

export default transformValidationError
