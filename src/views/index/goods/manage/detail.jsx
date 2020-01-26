import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'
const Item = List.Item
export default class Detail extends Component {
  title = (
    <div>
      <span onClick={this.props.history.goBack}>
        <Icon type="arrow-left" style={{ color: 'green', marginRight: 10 }} />
      </span>
      <span>商品详情</span>
    </div>
  )
  render () {
    return (
      <Card title={this.title}>
        <List>
          <Item>
            <span style={{ padding: '0 10px' }}>商品名称:</span>
            <span>123</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品描述:</span>
            <span>123</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品价格:</span>
            <span>123</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>所属分类:</span>
            <span>123</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品图片:</span>
            <span>123</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品详情:</span>
            <span>123</span>
          </Item>
        </List>
      </Card>
    )
  }
}