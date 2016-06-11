import { combineReducers } from 'redux'

import { routerReducer as routing } from 'react-router-redux'
import { reducer as form } from 'redux-form'
import counter from 'reducers/counter'
import todos from 'reducers/todos'
import auth from 'reducers/auth'

const reducers = combineReducers({
  auth,
  counter,
  todos,
  routing,
  form,
})

export default reducers
