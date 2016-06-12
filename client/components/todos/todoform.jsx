import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Col, Row, Button } from 'react-bootstrap'

const TodoForm = ({ createTodo }) =>
  <form className='todo-form' onSubmit={createTodo}>
    <Row>
      <Col sm={10} className='input-col'>
        <Field
          className='form-control'
          component='input'
          type='text'
          name='note'
          placeholder='I need to...'
        />
      </Col>
      <Col sm={2}>
        <Button className='btn-success btn-block' type='submit'>+</Button>
      </Col>
    </Row>
  </form>

TodoForm.propTypes = {
  createTodo: PropTypes.func.isRequired,
}

export default reduxForm({ form: 'createTodoForm' })(TodoForm)
