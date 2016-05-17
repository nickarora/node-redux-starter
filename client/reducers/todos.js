import { GET_TODOS_SUCCESS, CREATE_TODO_SUCCESS } from 'constants'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return action.payload
    case CREATE_TODO_SUCCESS:
      return [
        action.payload,
        ...state,
      ]
    default:
      return state
  }
}

export default reducer
