import { SIGNIN, SIGNOUT } from 'constants'
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
