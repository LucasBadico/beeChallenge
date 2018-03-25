import React from 'react'
import { Route, Switch } from 'react-router-dom'
import LocalCounter from './containers/LocalCounter'

export default (
  <Switch>
    <Route path='/hey' component={() => <p>HELLO FROM REACT!</p>} />
  </Switch>
)