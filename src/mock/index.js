import Mock from 'mockjs'
import { user, categorys } from './data'

Mock.mock('/login', 'post', function (options) {
  const data = JSON.parse(options.body)
  for (let i of user) {
    if (i.userName === data.userName && i.pwd === data.pwd) {
      return {
        code: 0,
        data: i
      }
    }
  }
  return {
    code: 1,
    msg: '账号密码错误！'
  }
})

Mock.mock('/getCatgory', 'post', function (options) {
  const data = JSON.parse(options.body)
  return {
    code: 0,
    data: categorys[data.id] || []
  }
})

Mock.mock('/change/category', 'post', function (options) {
  const data = JSON.parse(options.body)
  for (let i of categorys[data.parentId]) {
    if (i.id === data.id) i.name = data.name
  }
  return { code: 0 }
})