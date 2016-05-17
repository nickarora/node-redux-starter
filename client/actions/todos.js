import { GET_TODOS, CREATE_TODO, DELETE_TODO, TOGGLE_TODO } from 'constants'

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

export const deleteTodo = todo => (
  {
    type: DELETE_TODO,
    api: `/api/todos/${todo.id}`,
    method: 'delete',
  }
)

export const toggleTodo = todo => (
  {
    type: TOGGLE_TODO,
    api: `/api/todos/${todo.id}`,
    method: 'put',
    body: {
      todo: {
        ...todo,
        complete: !todo.complete,
      },
    },
  }
)
