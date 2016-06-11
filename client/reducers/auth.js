import {
  SIGNIN_SUCCESS,
  SIGNIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNUP_MISMATCH,
  SIGNOUT } from 'constants'

const initialState = {
  authenticated: !!sessionStorage.getItem('token'),
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
    case SIGNIN_SUCCESS:
      return { authenticated: true, error: '' }
    case SIGNIN_FAILURE:
      return { ...state, error: 'Invalid email or password.' }
    case SIGNUP_FAILURE:
      return { ...state, error: action.payload.friendlyErr }
    case SIGNUP_MISMATCH:
      return { ...state, error: 'Passwords do not match.' }
    case SIGNOUT:
      return { authenticated: false, error: '' }
    default:
      return state
  }
}

export default reducer
