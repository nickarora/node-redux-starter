import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import getRoutes from 'routes'
import { DevTools } from 'utils'

const Root = ({ store, history }) =>
  <Provider store={store}>
    <div>
      <Router history={history}>
        {getRoutes()}
      </Router>
      <DevTools />
    </div>
  </Provider>

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
