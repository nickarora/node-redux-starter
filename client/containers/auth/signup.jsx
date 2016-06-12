import React, { PropTypes, Component } from 'react'
import { reduxForm, reset } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AuthTextInput, AuthErrorOutput, AuthSubmit, AuthFormTitle } from 'components'
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

const validate = values => {
  const errors = {}

  const required = ['email', 'password', 'passwordConfirmation']
  required.forEach(field => {
    if (!values[field]) errors[field] = 'Required.'
  })

  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address.'
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  if (values.password && values.passwordConfirmation &&
    values.password !== values.passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords do not match.'
  }

  return errors
}

class Signup extends Component {
  componentWillMount() {
    this.props.actions.clearAuthErrors()
  }

  render() {
    const { auth } = this.props

    return (
      <form onSubmit={(e) => submitSignup(e, this.props)}>
        <AuthFormTitle title='Sign Up' />
        <AuthTextInput name='email' type='text' placeholder='email' />
        <AuthTextInput name='password' type='password' placeholder='password' />
        <AuthTextInput name='passwordConfirmation' type='password' placeholder='confirm password' />
        <AuthSubmit label='Sign Up' />
        {auth.error && <AuthErrorOutput error={auth.error} />}
      </form>
    )
  }
}

Signup.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  resetForm: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
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
export default reduxForm({ form: 'signupForm', validate })(connectedSignup)
