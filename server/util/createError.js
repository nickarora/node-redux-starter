const createError = (message = 'Oops! Something went wrong!', status = 422) => {
  const err = new Error(message)
  err.status = status
  return err
}

export default createError
