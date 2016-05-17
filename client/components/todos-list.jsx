import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import { Todo } from 'components'

const TodosList = ({ todos, deleteTodo, toggleTodo }) =>
  <Table striped hover>
    <tbody>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo)}
          toggleTodo={() => toggleTodo(todo)}
        />
      )}
    </tbody>
  </Table>

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodo: PropTypes.func.isRequired,
}

export default TodosList
