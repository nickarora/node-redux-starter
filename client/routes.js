/* eslint-disable new-cap */
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import { App, Counter, Todos, Signin, Signup } from 'containers'
import { Home, RequireAuth, NotFound } from 'components'

const getRoutes = () =>
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='counter' component={RequireAuth(Counter)} />
    <Route path='todos' component={RequireAuth(Todos)} />
    <Route path='signin' component={Signin} />
    <Route path='signup' component={Signup} />
    <Route path='*' component={NotFound} />
  </Route>

export default getRoutes
