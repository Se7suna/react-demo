import React, { Component } from 'react'
import { Modal, Form, Input, Select } from 'antd'
import PropTypes from 'prop-types'
import { reqChangeCategory } from '@/api'
const { Option } = Select

class ChangeForm extends Component {
  static propTypes = {
    list: PropTypes.array.isRequired,
    subList: PropTypes.array.isRequired,
    showId: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired,
    getList: PropTypes.func.isRequired,
    showCancel: PropTypes.func.isRequired,
    changeId: PropTypes.string.isRequired
  }

  onOk = async () => {
    const { showId, getList, form, showCancel } = this.props
    const { changeId, changeName } = form.getFieldsValue()
    const res = await reqChangeCategory(changeId, changeName)
    if (res.status === 0) {
      getList(showId)
      form.resetFields()
      showCancel()
    }
  }

  render () {
    const { list, subList, showId, visible, showCancel,changeId } = this.props
    const { getFieldDecorator } = this.props.form
    return (
      <Modal
        title="修改内容"
        visible={visible}
        onCancel={showCancel}
        onOk={this.onOk}
        okText="确认"
        cancelText="取消"
      >
        <Form className="login-form">
          <Form.Item>
            {getFieldDecorator('changeId', { initialValue: changeId })(
              <Select placeholder="选择分类">
                {showId === '0' ?
                  list.map(item => (<Option value={item._id} key={item._id}>{item.name}</Option>)) :
                  subList.map(item => (<Option value={item._id} key={item._id}>{item.name}</Option>))
                }
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('changeName', { initialValue: '' })(<Input placeholder="修改内容" />)}
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(ChangeForm)