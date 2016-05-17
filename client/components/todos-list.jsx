import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import { Todo } from 'components'

const TodosList = ({ todos, deleteTodo }) =>
  <Table striped hover>
    <tbody>
      {todos.map(todo =>
        <Todo
          key={todo.id}
          todo={todo}
          deleteTodo={() => deleteTodo(todo)}
        />
      )}
    </tbody>
  </Table>

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}

export default TodosList
