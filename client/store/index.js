import { createStore, applyMiddleware, compose } from 'redux'
import { DevTools } from 'utils'
import rootReducer from 'reducers'
import api from 'middleware/api'

const enhancer = compose(applyMiddleware(api), DevTools.instrument())

const configureStore = (initialState) => createStore(rootReducer, initialState, enhancer)

export default configureStore
