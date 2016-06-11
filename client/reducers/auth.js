import { SIGNIN_SUCCESS } from 'constants'

const initialState = {
  authenticated: false,
  message: '',
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return { ...state, authenticated: true }
    default:
      return state
  }
}

export default reducer
