import React, { Component } from 'react'
import { Card, Icon, Form, Input, Upload, Modal, Cascader } from 'antd'
import { reqCategory } from '@/api'
const { TextArea } = Input

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class Add extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      }
    ],
    good: {},
    category: []
  }

  formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  }

  uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handleChange = ({ fileList }) => this.setState({ fileList })

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

  componentWillMount () {
    const data = this.props.location.state
    if (data) {
      this.setState({
        good: data
      })
    }
  }

  async componentDidMount () {
    let topCategory = await this.getCategory(0)
    for (let i of topCategory) {
      this.getCategory(i._id)
    }
  }

  render () {
    const { previewVisible, previewImage, fileList, good, category } = this.state;
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
            <Input value={good.name} />
          </Form.Item>
          <Form.Item label="商品描述">
            <TextArea value={good.desc} />
          </Form.Item>
          <Form.Item label="商品价格">
            <Input type="number" value={good.price} addonAfter="元" />
          </Form.Item>
          <Form.Item label="商品分类">
            <Cascader options={category} changeOnSelect placeholder="请选择" value={[good.pCategoryId, good.categoryId]} />
          </Form.Item>
          <Form.Item label="商品图片">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {fileList.length >= 8 ? null : this.uploadButton}
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </Form.Item>
          <Form.Item label="商品详情">
            <Input />
          </Form.Item>
        </Form>
      </Card>
    )
  }
}