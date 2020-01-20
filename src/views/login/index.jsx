import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import './index.less'

class Login extends Component {
  checkData = (rule, value, callback) => {
    if (value.trim() === '') {
      callback('not kong')
    } else if (value.length < 4) {
      callback('min 4')
    } else if (value.length > 12) {
      callback('max 12')
    } else {
      callback()
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('login: ', values);
      }
    });
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
              {getFieldDecorator('id', {
                rules: [
                  { required: true, message: '用户名必填!' },
                  { min: 4, message: '最少4位!' },
                  { max: 12, message: '最多12位!' },
                  { pattern: /^[A-z0-9_]+$/, message: '只能输入英文数字下划线' }
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
