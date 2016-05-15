import React, { PropTypes } from 'react'
import { Grid } from 'react-bootstrap'

import { Header } from 'components'

const App = ({ children }) =>
  <div>
    <Header />
    <Grid>{children}</Grid>
  </div>

App.propTypes = {
  children: PropTypes.node.isRequired,
}

export default App
