import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import getRoutes from 'routes'
import { DevTools } from 'utils'

const isProduction = () => process.env.NODE_ENV === 'production'

const Root = ({ store, history }) =>
  <Provider store={store}>
    <div>
      <Router history={history}>
        {getRoutes()}
      </Router>
      {!isProduction() && <DevTools />}
    </div>
  </Provider>

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default Root
