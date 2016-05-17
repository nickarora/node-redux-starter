import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import * as TodosActions from 'actions/todos'

import { TodosList, TodoForm } from 'components'

class Todos extends Component {
  componentWillMount() {
    const { actions } = this.props
    actions.fetchTodos()
  }

  createTodo(e) {
    e.preventDefault()
    const { actions, form } = this.props
    const { createTodo } = form

    if (!createTodo.values || !createTodo.values.note) return

    actions.createTodo({
      note: createTodo.values.note,
      complete: false,
    })
  }

  render() {
    const { todos } = this.props

    return (
      <Row>
        <Col xs={8}>
          <h2>Todos</h2>
          <TodoForm createTodo={e => this.createTodo(e)} />
          <TodosList todos={todos} />
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
})

Todos.propTypes = {
  actions: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  todos: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
