import { CLEAR_AUTH_ERRORS, SIGNIN, SIGNOUT, SIGNUP } from 'constants'
import { browserHistory } from 'react-router'

export const signin = credentials => (
  {
    type: SIGNIN,
    api: '/auth/signin',
    method: 'post',
    body: credentials,
    redirect: {
      success: '/',
    },
    session: 'token',
  }
)

export const signout = () => {
  sessionStorage.removeItem('token')
  browserHistory.push('/')
  return {
    type: SIGNOUT,
  }
}

export const signup = credentials => (
  {
    type: SIGNUP,
    api: '/auth/signup',
    method: 'post',
    body: credentials,
    redirect: {
      success: '/',
    },
    session: 'token',
  }
)

export const clearAuthErrors = () => (
  {
    type: CLEAR_AUTH_ERRORS,
  }
)
