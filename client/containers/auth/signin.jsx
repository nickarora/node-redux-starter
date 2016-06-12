import React, { PropTypes, Component } from 'react'
import { reduxForm, reset } from 'redux-form'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { AuthTextInput, AuthErrorOutput, AuthSubmit, AuthFormTitle } from 'components'
import * as AuthActions from 'actions/auth'

const submitSignin = (e, { actions, form, resetForm }) => {
  e.preventDefault()
  const { signinForm } = form
  if (!signinForm || !signinForm.values) return

  actions.signin(signinForm.values)
  resetForm('signinForm')
}

class Signin extends Component {
  componentWillMount() {
    this.props.actions.clearAuthErrors()
  }

  render() {
    const { auth } = this.props

    return (
      <form onSubmit={(e) => submitSignin(e, this.props)}>
        <AuthFormTitle title='Sign In' />
        <AuthTextInput name='email' type='text' placeholder='email' />
        <AuthTextInput name='password' type='password' placeholder='password' />
        <AuthSubmit label='Sign In' />
        {auth.error && <AuthErrorOutput error={auth.error} />}
      </form>
    )
  }
}

Signin.propTypes = {
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

const connectedSignin = connect(mapStateToProps, mapDispatchToProps)(Signin)
export default reduxForm({ form: 'signinForm' })(connectedSignin)
