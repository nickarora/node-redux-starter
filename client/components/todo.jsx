import React, { PropTypes } from 'react'

const Todo = ({ todo }) =>
  <tr>
    <td>
      <h5 className={todo.complete ? 'todo-complete' : ''}>
        {todo.note}
      </h5>
    </td>
  </tr>

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
}

export default Todo
