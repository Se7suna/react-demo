import React, { Component } from 'react'
import { Card, Table, Button, Modal, Form, Input, Select } from 'antd'
import { reqCategory, reqChangeCategory } from '@/api'
import './index.less'

const { Option } = Select
class Category extends Component {
  state = {
    showId: 0,
    showName: '',
    list: [],
    subList: [],
    loading: true,
    visible: false
  }
  columns = [
    { title: '名称', dataIndex: 'name', key: 'id', },
    {
      title: '操作', width: 30,
      render: item => {
        return (
          <span>
            <Button type="link" onClick={() => this.showChange(item)}>修改分类</Button>
            {this.state.showId === 0 ? (<Button type="link" onClick={() => this.showSub(item)}>产看子分类</Button>) : ''}
          </span>
        )
      }
    }
  ]

  getLIst = async id => {
    this.setState({ loading: true })
    const res = await reqCategory(id)
    for (let i of res.data) {
      i.key = i.id
    }
    if (id === 0) {
      this.setState({ list: res.data, loading: false })
    } else {
      this.setState({ subList: res.data, loading: false })
    }
  }

  showChange = item => {
    this.changeItem = item
    this.setState({ visible: true })
  }

  showSub = item => {
    this.getLIst(item.id)
    this.setState({ showId: item.id, showName: item.name })
  }

  back = () => {
    this.setState({ showId: 0 })
  }

  onCancel = () => {
    this.setState({ visible: false })
  }

  onOk = async () => {
    const { showId } = this.state
    const { id, name } = this.props.form.getFieldsValue()
    const res = await reqChangeCategory(showId, id, name)
    if (res.code === 0) {
      this.getLIst(showId)
      this.props.form.resetFields()
      this.setState({ visible: false })
    }
  }

  componentDidMount = () => {
    this.getLIst(this.state.showId)
  }

  render () {
    const { list, showId, subList, loading } = this.state
    const { getFieldDecorator } = this.props.form
    const headTitle = (
      <span>
        <Button type="link" onClick={this.back}>一级列表分类</Button> => {this.state.showName}
      </span>
    )
    return (
      <Card title={showId === 0 ? '一级列表分类' : headTitle} extra={<Button type="primary">添加</Button>}>
        <Table dataSource={showId === 0 ? list : subList} columns={this.columns} loading={loading} />
        <Modal
          title="修改内容"
          visible={this.state.visible}
          onCancel={this.onCancel}
          onOk={this.onOk}
          okText="确认"
          cancelText="取消"
        >
          <Form className="login-form">
            <Form.Item>
              {getFieldDecorator('id', { initialValue: this.changeItem && this.changeItem.id })(
                <Select placeholder="选择分类">
                  {showId === 0 ?
                    list.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>)) :
                    subList.map(item => (<Option value={item.id} key={item.id}>{item.name}</Option>))
                  }
                </Select>
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('name', { initialValue: '' })(<Input placeholder="修改内容" />)}
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    )
  }
}

export default Form.create()(Category)