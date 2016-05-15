import { combineReducers } from 'redux'

import { routerReducer as routing } from 'react-router-redux'
import counter from 'reducers/counter'

const reducers = combineReducers({
  counter,
  routing,
})

export default reducers
