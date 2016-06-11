import { SIGNIN_SUCCESS, SIGNIN_FAILURE, SIGNOUT } from 'constants'

const initialState = {
  authenticated: !!sessionStorage.getItem('token'),
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { authenticated: true, error: '' }
    case SIGNIN_FAILURE:
      return { authenticated: false, error: 'Invalid email or password.' }
    case SIGNOUT:
      return { authenticated: false, error: '' }
    default:
      return state
  }
}

export default reducer
