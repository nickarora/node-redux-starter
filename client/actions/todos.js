import { GET_TODOS } from 'constants'

export const fetchTodos = () => (
  {
    type: GET_TODOS,
    api: '/api/todos',
  }
)
