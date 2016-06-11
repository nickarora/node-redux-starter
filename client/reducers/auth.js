import { SIGNIN_SUCCESS, SIGNIN_FAILURE } from 'constants'

const initialState = {
  authenticated: !!sessionStorage.getItem('token'),
  error: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { authenticated: true, error: '' }
    case SIGNIN_FAILURE:
      return { ...state, error: 'Invalid email or password.' }
    default:
      return state
  }
}

export default reducer
