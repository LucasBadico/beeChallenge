import React from 'react'
import { Route, Switch } from 'react-router-dom'
// import './elemental.less'

export default (
  <Switch>
    <Route path='/hey' component={() => <h1>HELLO FROM REACT!</h1>} />
  </Switch>
)