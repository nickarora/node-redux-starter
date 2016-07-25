import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import Root from 'components/root'
import configureStore from 'store'

import 'styles/main'

const store = configureStore({})
const history = syncHistoryWithStore(browserHistory, store)
const rootElement = document.getElementById('root')

function renderApp(RootComponent) {
  render(
    <AppContainer>
      <RootComponent store={store} history={history} />
    </AppContainer>,
    rootElement
  )
}

renderApp(Root)

if (module.hot) {
  module.hot.accept(
    './components/root',
    () => renderApp(require('./components/root').default) // eslint-disable-line global-require
  )
}
