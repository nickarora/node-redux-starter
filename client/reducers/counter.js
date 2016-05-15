import { INCREMENT_COUNTER, DECREMENT_COUNTER } from 'constants'

const initialState = 0

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state + 1
    case DECREMENT_COUNTER:
      return state - 1
    default:
      return state
  }
}

export default reducer
