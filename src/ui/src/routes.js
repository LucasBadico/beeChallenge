import React from 'react'
import { Route, IndexRedirect } from 'react-router'
import App from './components/App'
import LocalCounter from './containers/LocalCounter'

export default (
  <Route path='/' component={App}>
    <IndexRedirect to='/remote-counter' />
    <Route path='local-counter' component={LocalCounter} />
  </Route>
)