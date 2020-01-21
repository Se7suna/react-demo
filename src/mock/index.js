import Mock from 'mockjs'

Mock.mock('/login', 'post', function (options) {
  const data = JSON.parse(options.body)
  if (data.userName === 'admin' && data.pwd === 'admin') {
    return {
      code: 0,
      data: {
        _id: 1234,
        userName: data.userName
      }
    }
  } else {
    return {
      code: 1,
      msg: '账号密码错误！'
    }
  }
})