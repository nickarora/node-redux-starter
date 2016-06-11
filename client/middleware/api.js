import 'isomorphic-fetch'
import { browserHistory } from 'react-router'

import config from 'config'

const API_ROOT = config.endpoint

const checkStatus = response => {
  if (!response.ok) {
    const error = new Error(response.statusText)
    return response.json()
      .then(responseBody => {
        error.message = responseBody.message || error.message
        throw error
      })
  }

  return response.json()
}

const applyRedirect = (redirect, type) => {
  if (redirect && redirect[type]) browserHistory.push(redirect[type])
}

const apiMiddleware = () =>
  next => action => {
    const { type, api, method, body, redirect, session } = action

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
      applyRedirect(redirect, 'success')
      if (session) sessionStorage[session] = response[session]
      next({
        type: SUCCESS,
        payload: response,
      })
    })
    .catch(error => {
      applyRedirect(redirect, 'failure')
      next({ type: FAILURE, payload: error })
    })
  }

export default apiMiddleware
