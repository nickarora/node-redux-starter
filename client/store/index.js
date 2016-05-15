import { createStore, compose } from 'redux'
import { DevTools } from 'utils'
import rootReducer from 'reducers'

const enhancer = compose(
  // applyMiddleware(d1, d2, d3...),
  DevTools.instrument()
)

const configureStore = (initialState) => createStore(rootReducer, initialState, enhancer)

export default configureStore
