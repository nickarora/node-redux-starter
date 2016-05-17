import { GET_TODOS, CREATE_TODO } from 'constants'

export const fetchTodos = () => (
  {
    type: GET_TODOS,
    api: '/api/todos',
  }
)

export const createTodo = todo => (
  {
    type: CREATE_TODO,
    api: '/api/todos',
    method: 'post',
    body: {
      todo,
    },
  }
)
