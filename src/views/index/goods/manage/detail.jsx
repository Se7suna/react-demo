import React, { Component } from 'react'
import { Card, List, Icon } from 'antd'
import { reqTypeInfo } from '@/api'
const Item = List.Item
export default class Detail extends Component {
  state = {
    pName: '',
    cName: ''
  }
  title = (
    <div>
      <span onClick={this.props.history.goBack}>
        <Icon type="arrow-left" style={{ color: 'green', marginRight: 10 }} />
      </span>
      <span>商品详情</span>
    </div>
  )
  async componentDidMount () {
    const { pCategoryId, categoryId } = this.props.location.state
    if (pCategoryId === '0') {
      const res = await reqTypeInfo(categoryId)
      if (!res.status) {
        this.setState({
          pName: res.data.name
        })
      }
    }
    const res = await Promise.all([reqTypeInfo(pCategoryId), reqTypeInfo(categoryId)])
    if (!res.find(item => item.status !== 0)) {
      this.setState({
        pName: res[0].data.name,
        cName: res[1].data.name
      })
    }
  }

  render () {
    const data = this.props.location.state
    const { cName, pName } = this.state
    return (
      <Card title={this.title}>
        <List>
          <Item>
            <span style={{ padding: '0 10px' }}>商品名称:</span>
            <span>{data.name}</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品描述:</span>
            <span>{data.desc}</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品价格:</span>
            <span>{data.price}元</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>所属分类:</span>
            <span>{pName}{cName ? ` ---> ${cName}` : ''}</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品图片:</span>
            <span>{
              data.imgs.map(item => (<img style={{ width: 100 }} key={item} src={'/upload/' + item} alt={item} />))
            }</span>
          </Item>
          <Item>
            <span style={{ padding: '0 10px' }}>商品详情:</span>
            <div dangerouslySetInnerHTML={{
              __html: data.detail
            }}></div>
          </Item>
        </List>
      </Card>
    )
  }
}