import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

import * as AuthActions from 'actions/auth'

import { Header } from 'components'

const App = ({ authActions, authenticated, children }) =>
  <div>
    <Header authenticated={authenticated} signout={authActions.signout} />
    <Grid>{children}</Grid>
  </div>

App.propTypes = {
  authActions: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
})

const mapDispatchToProps = (dispatch) => ({
  authActions: bindActionCreators(AuthActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
