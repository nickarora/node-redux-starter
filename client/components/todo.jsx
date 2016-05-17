import React, { PropTypes } from 'react'
import { Button } from 'react-bootstrap'

const Todo = ({ todo, deleteTodo, toggleTodo }) =>
  <tr className='todo'>
    <td>
      <input
        type='checkbox'
        checked={todo.complete}
        onChange={toggleTodo}
      />
      <h5 className={`note ${todo.complete ? 'complete' : ''}`}>
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
  toggleTodo: PropTypes.func.isRequired,
}

export default Todo
