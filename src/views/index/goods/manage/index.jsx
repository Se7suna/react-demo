import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import List from './list'
import Add from './add'
import Detail from './detail'

export default class Goods extends Component {
  render () {
    return (
      <Switch>
        <Route path="/manage" component={List} exact />
        <Route path="/manage/add" component={Add} />
        <Route path="/manage/detail" component={Detail} />
        <Redirect to="/manage" />
      </Switch>
    )
  }
}