import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row } from 'react-bootstrap'
import * as TodosActions from 'actions/todos'

import { TodosList } from 'components'

class Todos extends Component {
  componentWillMount() {
    const { actions } = this.props
    actions.fetchTodos()
  }

  render() {
    const { todos } = this.props

    return (
      <Row>
        <Col xs={8}>
          <h2>Todos</h2>
          <TodosList todos={todos} />
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = ({ todos }) => ({
  todos,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(TodosActions, dispatch),
})

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
