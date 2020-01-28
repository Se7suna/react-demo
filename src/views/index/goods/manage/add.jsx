import React, { Component } from 'react'
import { Card, Icon, Form, Input, Cascader, Button } from 'antd'
import { reqCategory } from '@/api'
import ImgUpload from './ImgUpload'
const { TextArea } = Input

export default class Add extends Component {
  state = {
    good: {},
    category: []
  }

  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  changeValue = (key, e) => {
    const { good } = this.state
    good[key] = e.target.value
    this.setState({ good })
  }

  getCategory = async id => {
    const res = await reqCategory(id)
    if (!res.status) {
      for (let i of res.data) {
        i.value = i._id
        i.label = i.name
      }
      if (+id === 0) {
        this.setState({ category: res.data })
        return res.data
      } else {
        const { category } = this.state
        const data = category.map(item => {
          if (item._id === id) item.children = res.data
          return item
        })
        this.setState({ category: data })
      }
    }
  }

  cascaderChange = (idArr) => {
    const { good } = this.state
    good.pCategoryId = idArr[0]
    good.categoryId = idArr[1]
    this.setState({ good })
  }

  componentWillMount () {
    const data = this.props.location.state
    if (data) {
      this.setState({
        good: data
      })
    }
  }

  pushData = () => {
    console.log(this.refs.imgs.getList())
  }

  async componentDidMount () {
    let topCategory = await this.getCategory(0)
    for (let i of topCategory) {
      this.getCategory(i._id)
    }
  }

  render () {
    const { good, category } = this.state;
    let casArr = [good.categoryId]
    if (+good.pCategoryId !== 0) casArr.unshift(good.pCategoryId)
    const title = (
      <div>
        <span onClick={this.props.history.goBack}>
          <Icon type="arrow-left" style={{ color: 'green', marginRight: 10 }} />
        </span>
        <span>{good._id ? '修改商品' : '添加商品'}</span>
      </div>
    )
    return (
      <Card title={title}>
        <Form {...this.formItemLayout}>
          <Form.Item label="商品名称">
            <Input value={good.name} onChange={e => this.changeValue('name', e)} />
          </Form.Item>
          <Form.Item label="商品描述">
            <TextArea value={good.desc} onChange={e => this.changeValue('desc', e)} />
          </Form.Item>
          <Form.Item label="商品价格">
            <Input type="number" value={good.price} addonAfter="元" onChange={e => this.changeValue('price', e)} />
          </Form.Item>
          <Form.Item label="商品分类">
            <Cascader options={category} changeOnSelect placeholder="请选择" value={casArr} onChange={this.cascaderChange} />
          </Form.Item>
          <Form.Item label="商品图片">
            <ImgUpload good={good} ref="imgs" />
          </Form.Item>
          <Form.Item label="商品详情">
            <Input />
            <Button onClick={this.pushData}>提交</Button>
          </Form.Item>
        </Form>
      </Card>
    )
  }
}