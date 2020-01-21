import React, { Component } from 'react'
import { Redirect, Switch, Route, Link } from 'react-router-dom'
import { Menu, Icon, Layout } from 'antd';
import memory from '@/utils/memory.js'
import { getUser, removeUser } from '@/utils/local.js'
import Bar from '@/views/index/chart/bar'
import Pie from '@/views/index/chart/pie'
import Line from '@/views/index/chart/line'
import Category from '@/views/index/goods/category'
import Manage from '@/views/index/goods/manage'
import Home from '@/views/index/home'
import User from '@/views/index/user'
import Rule from '@/views/index/rule'
import menus from '@/configs/menu.js'
import IndexHeader from '@/components/IndexHeader'

import './index.less'
const { Footer, Sider, Content } = Layout
const { SubMenu } = Menu

export default class Index extends Component {
  getNavList = (list) => {
    return list.map(item => {
      if (!item.children) {
        return (
          <Menu.Item key={item.path}>
            <Link to={item.path}>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </Link>
          </Menu.Item>
        )
      } else {
        return (
          <SubMenu key={item.path} title={
            <span>
              <Icon type={item.icon} />
              <span>{item.name}</span>
            </span>
          }>
            {this.getNavList(item.children)}
          </SubMenu>
        )
      }
    })
  }

  findOpenKey = () => {
    let res = ''
    const { pathname } = this.props.location
    for (let item of menus) {
      if (item.children) {
        for (let itemChindren of item.children) {
          if (itemChindren.path === pathname) res = item.path
        }
      }
    }
    return res
  }

  logout = () => {
    removeUser()
    this.props.history.replace('/login')
  }

  componentWillMount () {
    memory.user = getUser()
    this.navList = this.getNavList(menus)
    this.openKey = this.findOpenKey()
    this.setState({ name: memory.user.userName })
  }

  render () {
    if (!memory.user._id) return <Redirect to="/login" />
    const { pathname } = this.props.location
    return (
      <Layout className="IndexPage">
        <Sider className="sider">
          <h1 className="sider-title">LOGO</h1>
          <Menu mode="inline" theme="dark" selectedKeys={[pathname]} defaultOpenKeys={[this.openKey]}>
            {this.navList}
          </Menu>
        </Sider>
        <Layout>
          <IndexHeader />
          <Content>
            <Switch>
              <Route path="/home" component={Home} />
              <Route path="/category" component={Category} />
              <Route path="/manage" component={Manage} />
              <Route path="/user" component={User} />
              <Route path="/rule" component={Rule} />
              <Route path="/pie" component={Pie} />
              <Route path="/line" component={Line} />
              <Route path="/bar" component={Bar} />
              <Redirect to="/home" />
            </Switch>
          </Content>
          <Footer className="footer">Made with ❤ by wuliao</Footer>
        </Layout>
      </Layout>
    )
  }
}
