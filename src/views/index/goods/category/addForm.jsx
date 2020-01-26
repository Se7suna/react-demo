import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { reqAddCategory } from '@/api'
const { Option } = Select

class AddForm extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    showId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    getList: PropTypes.func.isRequired,
    showCancel: PropTypes.func.isRequired
  }

  onOk = async () => {
    const { showId, getList, form, showCancel } = this.props
    const { addId, addName } = form.getFieldsValue()
    const res = await reqAddCategory(addId, addName)
    if (res.status === 0) {
      getList(showId)
      form.resetFields()
      showCancel()
    }
  }

  onCancel = () => {
    this.setState({ visible2: false })
  }

  render () {
    const { list, showId, visible, showCancel } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="添加分类"
        visible={visible}
        onCancel={showCancel}
        onOk={this.onOk}
        okText="确认"
        cancelText="取消"
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('addId', { initialValue: showId })(
              <Select placeholder="选择分类">
                <Option value='0'>一级分类</Option>
                {list.map(item => (<Option value={item._id} key={item._id}>{item.name}</Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('addName', { initialValue: '' })(<Input placeholder="添加内容" />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(AddForm)