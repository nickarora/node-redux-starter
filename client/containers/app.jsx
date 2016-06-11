import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Grid } from 'react-bootstrap'

import { Header } from 'components'

const App = ({ authenticated, children }) =>
  <div>
    <Header authenticated={authenticated} />
    <Grid>{children}</Grid>
  </div>

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
}

const mapStateToProps = ({ auth }) => ({
  authenticated: auth.authenticated,
})

export default connect(mapStateToProps)(App)
