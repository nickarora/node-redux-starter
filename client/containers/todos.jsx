import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row, Button } from 'react-bootstrap'
import * as TodosActions from 'actions/todos'

import { TodosList } from 'components'

const Todos = ({ todos, actions }) =>
  <Row>
    <Col xs={8}>
      <h2>Todos</h2>
      <Button className='fetch-todos-button' onClick={actions.fetchTodos}>Fetch Todos</Button>
      <TodosList todos={todos} />
    </Col>
  </Row>

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
