import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Button } from 'antd'
import memory from '@/utils/memory.js'

const { Header } = Layout
class IndexHeader extends Component {
  state = {
    time: new Date().toLocaleString(),
    name: memory.user.userName
  }

  componentDidMount () {
    this.intervalId = setInterval(() => {
      this.setState({ time: new Date().toLocaleString() })
    }, 1000)
    console.log(this.props)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }
  render () {
    const { time, name } = this.state
    return (
      <Header className="header">
        <span>{time} &nbsp;&nbsp; 用户：{name}</span>
        <Button type="link" onClick={this.logout}>退出</Button>
      </Header>
    )
  }
}

export default withRouter(IndexHeader)