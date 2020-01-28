import React, { Component } from 'react'
import { Upload, Modal, Icon } from 'antd'
import { reqDelImg } from '@/api'

function getBase64 (file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export default class ImgUpload extends Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }
    ]
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

  handleChange = ({ file, fileList }) => {
    if (file.status === 'done') {
      const obj = fileList[fileList.length - 1]
      obj.name = obj.response.data.name
      obj.url = '/upload/' + obj.response.data.name
    }
    if (file.status === 'removed') {
      reqDelImg(file.name)
    }
    this.setState({ fileList })
  }

  getList = () => {
    return this.state.fileList.map(i => ({ name: i.name }))
  }

  componentWillMount () {
    const { good } = this.props
    const arr = []
    if (good) {
      for (let i of good.imgs) {
        arr.push({
          uid: '-' + i,
          name: i,
          status: 'done',
          url: '/upload/' + i,
        })
      }
    }
    this.setState({ fileList: arr })
  }

  render () {
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div>
        <Upload
          accept="image/*"
          name="image"
          action="/manage/img/upload"
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
      </div>
    )
  }
}