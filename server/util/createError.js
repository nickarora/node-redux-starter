const createError = (message = 'Oops! Something went wrong!') => {
  const err = new Error(message)
  err.status = 422
  return err
}

export default createError
