import {
  CLEAR_AUTH_ERRORS,
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNOUT } from 'constants'

const initialState = {
  authenticated: !!sessionStorage.getItem('token'),
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAR_AUTH_ERRORS:
      return { ...state, error: '' }
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return { authenticated: true, error: '' }
    case SIGNIN_FAILURE:
    case SIGNUP_FAILURE:
      return { ...state, error: action.payload.message }
    case SIGNOUT:
      return { authenticated: false, error: '' }
    default:
      return state
  }
}

export default reducer
