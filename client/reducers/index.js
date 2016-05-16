import { combineReducers } from 'redux'

import { routerReducer as routing } from 'react-router-redux'
import counter from 'reducers/counter'
import todos from 'reducers/todos'

const reducers = combineReducers({
  counter,
  todos,
  routing,
})

export default reducers
