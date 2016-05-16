import 'isomorphic-fetch'
import config from 'config'

const API_ROOT = config.endpoint

const checkStatus = response => {
  const { status, statusText } = response

  if (!status || status < 200 || status >= 300) {
    const err = new Error(statusText || status || 'Invalid Request.')
    err.response = response.json()
    throw err
  }

  return response.json()
}

const apiMiddleware = () =>
  next => action => {
    const { type, api, method } = action

    if (!api) return next(action)

    const fullUrl = `${API_ROOT}${api}`
    const defaultParams = {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const reqConfig = method ? {
      ...defaultParams,
      method,
    } : defaultParams

    const REQUEST = `${type}_REQUEST`
    const SUCCESS = `${type}_SUCCESS`
    const FAILURE = `${type}_FAILURE`

    next({ type: REQUEST })

    return fetch(fullUrl, reqConfig)
    .then(checkStatus)
    .then(response => {
      next({
        type: SUCCESS,
        payload: response,
      })

      return true
    })
    .catch(error => {
      next({ type: FAILURE, payload: error })

      return false
    })
  }

export default apiMiddleware
