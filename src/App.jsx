import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Login from '@/views/login'
import Index from '@/views/index'
import '@/App.less'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Index} />
        </Switch>
      </BrowserRouter>
    )
  }
}