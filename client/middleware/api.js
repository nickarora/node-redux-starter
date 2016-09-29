import 'isomorphic-fetch'
import { browserHistory } from 'react-router'
import { SIGNOUT } from 'constants'

const checkStatus = response => {
  if (!response.ok) {
    const error = new Error(response.statusText)
    return response.json()
      .then(responseBody => {
        error.message = responseBody.message || 'Oops! Something went wrong.'
        throw error
      })
  }

  return response.json()
}

const applyRedirect = (redirect, type) => {
  if (redirect && redirect[type]) browserHistory.push(redirect[type])
}

const redirectToRoot = () => {
  browserHistory.push('/')
}

const apiMiddleware = () =>
  next => action => {
    const { type, api, method, body, redirect, session } = action

    if (!api) return next(action)

    const defaultParams = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: sessionStorage.getItem('token'),
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

    return fetch(api, reqConfig)
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
      if (error.message === 'Invalid Token') {
        redirectToRoot()
        next({ type: SIGNOUT })
      }

      applyRedirect(redirect, 'failure')
      next({ type: FAILURE, payload: error })
    })
  }

export default apiMiddleware
