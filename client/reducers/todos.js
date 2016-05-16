import { GET_TODOS_SUCCESS, GET_TODOS_FAILURE } from 'constants'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TODOS_SUCCESS:
      return action.payload
    case GET_TODOS_FAILURE:
    default:
      return state
  }
}

export default reducer
