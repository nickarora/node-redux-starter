import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const Todo = ({ todo, deleteTodo }) =>
  <tr>
    <td>
      <h5 className={todo.complete ? 'todo-complete' : ''}>
        {todo.note}
      </h5>
    </td>
    <td>
      <Button
        bsStyle='link'
        className='pull-right'
        onClick={deleteTodo}
      >X</Button>
    </td>
  </tr>

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
  deleteTodo: PropTypes.func.isRequired,
}

export default Todo
