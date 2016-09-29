import {
  transformValidationError,
  transformDatabaseError,
} from '.'

const transformError = err => {
  if (err.name && err.name === 'ValidationError') {
    return transformValidationError(err)
  }

  if (err.table) {
    return transformDatabaseError(err)
  }

  return err
}

export default transformError
