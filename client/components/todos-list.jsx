import React, { PropTypes } from 'react'
import { Table } from 'react-bootstrap'
import { Todo } from 'components'

const TodosList = ({ todos }) =>
  <Table striped bordered condensed hover>
    <tbody>
      {todos.map(todo =>
        <Todo key={todo.id} todo={todo} />
      )}
    </tbody>
  </Table>

TodosList.propTypes = {
  todos: PropTypes.array.isRequired,
}

export default TodosList
