import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { reqLogin } from '@/api'
import { setUser, getUser } from '@/utils/local.js'
import './index.less'

class Login extends Component {
  checkData = (rule, value, callback) => {
    if (value.trim() === '') {
      callback('密码必填')
    } else if (value.length < 4) {
      callback('密码最少4位')
    } else if (value.length > 12) {
      callback('密码最多12位')
    } else {
      callback()
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await reqLogin(values.userName, values.pwd)
        if (!res.code) {
          message.success('登陆成功！')
          setUser(res.data)
          this.props.history.replace('/')
        } else {
          message.error(res.msg)
        }
      } else {
        message.warning('信息填写不完整！')
      }
    });
  }

  componentWillMount () {
    if (getUser()._id) {
      this.props.history.replace('/home')
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="LoginPage">
        <header className="header">react-admin 登陆页面</header>
        <div className="form">
          <h4 className="form-title">欢迎登陆</h4>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [
                  { required: true, message: '用户名必填 ' },
                  { min: 4, message: '最少4位 ' },
                  { max: 12, message: '最多12位 ' },
                  { pattern: /^[A-z0-9_]+$/, message: '只能输入英文数字下划线 ' }
                ],
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('pwd', {
                rules: [
                  { validator: this.checkData },
                ],
              })(
                <Input
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登陆
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(Login)
