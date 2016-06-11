import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'

import * as TodosActions from 'actions/todos'
import { reset } from 'redux-form'

import { TodosList, TodoForm } from 'components'

class Todos extends Component {
  componentWillMount() {
    const { actions } = this.props
    actions.fetchTodos()
  }

  createTodo(e) {
    e.preventDefault()
    const { actions, form, resetForm } = this.props
    const { createTodoForm } = form

    if (!createTodoForm.values || !createTodoForm.values.note) return

    actions.createTodo({
      note: createTodoForm.values.note,
      complete: false,
    })

    resetForm('createTodoForm')
  }

  render() {
    const { todos, actions } = this.props

    return (
      <Row>
        <Col xs={8}>
          <h3>Todos</h3>
          <TodoForm createTodo={e => this.createTodo(e)} />
          <TodosList
            todos={todos}
            deleteTodo={actions.deleteTodo}
            toggleTodo={actions.toggleTodo}
          />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ todos, form }) => ({
  todos,
  form,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodosActions, dispatch),
  resetForm: bindActionCreators(reset, dispatch),
})

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
  resetForm: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
