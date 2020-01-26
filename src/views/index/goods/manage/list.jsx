import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { reqGoodsList } from '@/api'

const { Option } = Select
export default class Goods extends Component {
  state = {
    list: [],
    total: 0
  }

  title = (
    <div>
      <Select defaultValue="name" style={{ width: 120 }} >
        <Option value="name">按名称搜索</Option>
        <Option value="des">按描述搜索</Option>
      </Select>
      <Input placeholder="请输入关键字" style={{ width: 220, margin: '0 10px' }} />
      <Button type="primary">搜索</Button>
    </div>
  )

  columns = [
    {
      title: '商品名称',
      dataIndex: 'name'
    },
    {
      title: '商品描述',
      dataIndex: 'desc'
    },
    {
      title: '价格',
      align: 'center',
      dataIndex: 'price'
    },
    {
      title: '状态',
      align: 'center',
      width: 120,
      render: Item => {
        return (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 5 }}>{{ 1: '已下架', 2: '已上架' }[Item.status]}</p>
            <Button type="primary">{{ 1: '上架', 2: '下架' }[Item.status]}</Button>
          </div >
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 120,
      render: () => {
        return (
          <div style={{ textAlign: "center" }}>
            <Button type="link" onClick={this.jumpAdd}>修改</Button>
            <Button type="link" onClick={this.jumpDetail}>查看</Button>
          </div>
        )
      }
    }
  ]

  jumpAdd = () => {
    this.props.history.push('/manage/add')
  }

  jumpDetail = () => {
    this.props.history.push('/manage/detail')
  }

  getList = async () => {
    let res = await reqGoodsList(1, 2)
    if (!res.status) {
      this.setState({
        list: res.data.list,
        total: res.data.total
      })
    }
  }

  componentDidMount () {
    this.getList()
  }

  render () {
    const { list, total } = this.state
    return (
      <Card title={this.title} extra={<Button type="primary" onClick={this.jumpAdd}>添加商品</Button>}>
        <Table dataSource={list} columns={this.columns} rowKey="_id" pagination={{ total: total, defaultPageSize: 2 }} />
      </Card>
    )
  }
}