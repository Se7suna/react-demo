import React, { Component } from 'react'
import { Card, Select, Input, Button, Table } from 'antd'
import { reqGoodsList, reqSearchGoods, reqSetStatus } from '@/api'

const { Option } = Select
export default class Goods extends Component {
  state = {
    list: [],
    total: 0,
    pageIndex: 1,
    loading: false,
    searchType: 'productName',
    searchKey: ''
  }

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
      render: item => {
        return (
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: 5 }}>{{ 1: '已下架', 2: '已上架' }[item.status]}</p>
            <Button type="primary" onClick={() => { this.setStatus(item) }}>{{ 1: '上架', 2: '下架' }[item.status]}</Button>
          </div >
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      width: 120,
      render: item => {
        return (
          <div style={{ textAlign: "center" }}>
            <Button type="link" onClick={() => this.jumpAdd(item)}>修改</Button>
            <Button type="link" onClick={() => this.jumpDetail(item)} > 查看</Button>
          </div>
        )
      }
    }
  ]

  jumpAdd = item => {
    this.props.history.push('/manage/add', item)
  }

  jumpDetail = item => {
    this.props.history.push('/manage/detail', item)
  }

  getList = () => {
    const { pageIndex } = this.state
    this.setState({
      loading: true
    }, async () => {
      let res = await reqGoodsList(pageIndex, 2)
      if (!res.status) {
        this.setState({
          list: res.data.list,
          total: res.data.total,
          loading: false
        })
      }
    })
  }

  indexChange = index => {
    this.setState({
      pageIndex: index
    }, () => {
      this.getList()
    })
  }

  titleChange = value => {
    this.setState({ searchType: value })
  }

  keyChange = e => {
    this.setState({ searchKey: e.target.value })
  }

  search = async () => {
    const { searchType, searchKey } = this.state
    if (!searchKey.trim()) {
      this.setState({
        pageIndex: 1
      }, () => {
        this.getList()
      })
      return
    }
    const res = await reqSearchGoods({
      pageNum: 1,
      pageSize: 2,
      [searchType]: searchKey
    })
    if (!res.status) {
      this.setState({
        list: res.data.list,
        total: res.data.total,
        pageIndex: 1
      })
    }
  }

  setStatus = async item => {
    let res = await reqSetStatus(item._id, item.status === 1 ? 2 : 1)
    if (!res.status) {
      this.getList()
    }
  }

  componentDidMount () {
    this.getList()
  }

  render () {
    const { list, total, loading, searchType, searchKey, } = this.state
    const title = (
      <div>
        <Select value={searchType} style={{ width: 120 }} onChange={this.titleChange}>
          <Option value="productName">按名称搜索</Option>
          <Option value="productDesc">按描述搜索</Option>
        </Select>
        <Input placeholder="请输入关键字" style={{ width: 220, margin: '0 10px' }} value={searchKey} onChange={this.keyChange} />
        <Button type="primary" onClick={this.search}>搜索</Button>
      </div>
    )

    return (
      <Card title={title} extra={<Button type="primary" onClick={this.jumpAdd}>添加商品</Button>}>
        <Table dataSource={list} columns={this.columns} rowKey="_id" pagination={{ total: total, defaultPageSize: 2, onChange: this.indexChange }} loading={loading} />
      </Card>
    )
  }
}