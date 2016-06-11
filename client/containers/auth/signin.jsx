import React, { PropTypes } from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { Col, Row, Button } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from 'actions/auth'

const submitSignin = (e, { actions, form, resetForm }) => {
  e.preventDefault()
  const { signinForm } = form
  actions.signin(signinForm.values)
  resetForm('signinForm')
}

const Signin = (props) =>
  <form onSubmit={(e) => submitSignin(e, props)}>
    <Row>
      <Col xs={4}>
        <h3>Sign In</h3>
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <Field
          className='form-control'
          component='input'
          type='text'
          name='email'
          placeholder='email'
        />
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <Field
          className='form-control'
          component='input'
          type='password'
          name='password'
          placeholder='password'
        />
      </Col>
    </Row>
    <Row>
      <Col xs={4}>
        <Button className='form-control' type='submit'>Sign In</Button>
      </Col>
    </Row>
  </form>

Signin.propTypes = {
  form: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({ form }) => ({
  form,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AuthActions, dispatch),
  resetForm: bindActionCreators(reset, dispatch),
})

const connectedSignin = connect(mapStateToProps, mapDispatchToProps)(Signin)
export default reduxForm({ form: 'signinForm' })(connectedSignin)
