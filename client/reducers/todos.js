import { GET_TODOS_SUCCESS, CREATE_TODO_SUCCESS, DELETE_TODO_SUCCESS } from 'constants'

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
    case DELETE_TODO_SUCCESS:
      return state.filter(todo => todo.id !== action.payload.id)
    default:
      return state
  }
}

export default reducer
