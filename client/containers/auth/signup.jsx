import React, { PropTypes } from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import { Col, Row, Button } from 'react-bootstrap'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as AuthActions from 'actions/auth'

const submitSignup = (e, { actions, form, resetForm }) => {
  e.preventDefault()
  const { signupForm } = form
  if (!signupForm || !signupForm.values) return

  const { values } = signupForm

  if (values.password !== values.passwordConfirmation) {
    actions.signupMismatch()
  } else {
    actions.signup(values)
  }

  resetForm('signupForm')
}

const Signup = (props) =>
  <form onSubmit={(e) => submitSignup(e, props)}>
    <Row>
      <Col xs={6}>
        <h3>Sign Up</h3>
      </Col>
    </Row>
    <Row className='form-group'>
      <Col xs={6}>
        <Field
          className='form-control'
          component='input'
          type='text'
          name='email'
          placeholder='email'
        />
      </Col>
    </Row>
    <Row className='form-group'>
      <Col xs={6}>
        <Field
          className='form-control'
          component='input'
          type='password'
          name='password'
          placeholder='password'
        />
      </Col>
    </Row>
    <Row className='form-group'>
      <Col xs={6}>
        <Field
          className='form-control'
          component='input'
          type='password'
          name='passwordConfirmation'
          placeholder='confirm password'
        />
      </Col>
    </Row>
    <Row className='form-group'>
      <Col xs={6}>
        <Button className='form-control' bsStyle='success' type='submit'>Sign Up</Button>
      </Col>
    </Row>
    {
      props.auth.error &&
        <Row className='form-group'>
          <Col xs={6}>
            <div className='alert alert-danger text-center'>{props.auth.error}</div>
          </Col>
        </Row>
    }
  </form>

Signup.propTypes = {
  form: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
}

const mapStateToProps = ({ form, auth }) => ({
  form,
  auth,
})

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(AuthActions, dispatch),
  resetForm: bindActionCreators(reset, dispatch),
})

const connectedSignup = connect(mapStateToProps, mapDispatchToProps)(Signup)
export default reduxForm({ form: 'signupForm' })(connectedSignup)
