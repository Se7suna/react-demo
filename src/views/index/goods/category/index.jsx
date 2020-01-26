import React, { Component } from 'react'
import { Card, Table, Button, Form } from 'antd'
import { reqCategory } from '@/api'
import AddForm from './addForm'
import ChangeForm from './changeForm'
import './index.less'

class Category extends Component {
  state = {
    showId: '0',
    showName: '',
    changeId: '0',
    list: [],
    subList: [],
    loading: true,
    visible: 0
  }

  getLIst = async id => {
    this.setState({ loading: true })
    const res = await reqCategory(id)
    if (id === '0') {
      this.setState({ list: res.data, loading: false })
    } else {
      this.setState({ subList: res.data, loading: false })
    }
  }

  showChange = item => {
    this.setState({ visible: 1, changeId: item._id })
  }

  showAdd = () => {
    this.setState({ visible: 2 })
  }

  showCancel = () => {
    this.setState({ visible: 0 })
  }

  showTop = () => {
    this.setState({ showId: '0' })
  }

  showSub = item => {
    this.getLIst(item._id)
    this.setState({ showId: item._id, showName: item.name })
  }

  componentDidMount = () => {
    this.getLIst(this.state.showId)
  }

  columns = [
    { title: '名称', dataIndex: 'name' },
    {
      title: '操作', width: 30,
      render: item => {
        return (
          <span>
            <Button type="link" onClick={() => this.showChange(item)}>修改分类</Button>
            {this.state.showId === '0' ? (<Button type="link" onClick={() => this.showSub(item)}>产看子分类</Button>) : ''}
          </span>
        )
      }
    }
  ]

  render () {
    const { list, showId, subList, loading, visible, changeId } = this.state
    const headTitle = (
      <span>
        <Button type="link" onClick={this.showTop}>一级列表分类</Button> => {this.state.showName}
      </span>
    )
    return (
      <Card title={showId === '0' ? '一级列表分类' : headTitle} extra={<Button type="primary" onClick={this.showAdd}>添加</Button>}>
        <Table dataSource={showId === '0' ? list : subList} columns={this.columns} loading={loading} pagination={{ pageSize: 2 }} rowKey="_id"/>
        <ChangeForm visible={visible === 1} list={list} showId={showId} getList={this.getLIst} showCancel={this.showCancel} subList={subList} changeId={changeId} />
        <AddForm visible={visible === 2} list={list} showId={showId} getList={this.getLIst} showCancel={this.showCancel} />
      </Card>
    )
  }
}

export default Form.create()(Category)