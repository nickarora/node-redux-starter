import { SIGNIN } from 'constants'

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
