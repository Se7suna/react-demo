import React, { Component } from 'react'
import './index.less'

export default class Test extends Component {
  render () {
    console.log(this.props)
    return (
      <div>Test</div>
    )
  }
}