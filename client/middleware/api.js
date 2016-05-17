import 'isomorphic-fetch'
import config from 'config'

const API_ROOT = config.endpoint

const checkStatus = response => {
  if (!response.ok) {
    throw new Error(response.statusText)
  }

  return response.json()
}

const apiMiddleware = () =>
  next => action => {
    const { type, api, method, body } = action

    if (!api) return next(action)

    const fullUrl = `${API_ROOT}${api}`
    const defaultParams = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const reqConfig = {
      ...defaultParams,
      method: method || 'get',
    }

    if (body) {
      reqConfig.body = JSON.stringify(body)
    }

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
    })
    .catch(error => {
      next({ type: FAILURE, payload: error })
    })
  }

export default apiMiddleware
