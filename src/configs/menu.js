export default [
  {
    name: '首页',
    path: '/home',
    icon: 'windows'
  },
  {
    name: '商品',
    path: '/goods',
    icon: 'apple',
    children: [
      {
        name: '品类管理',
        path: '/category',
        icon: 'gitlab'
      },
      {
        name: '商品管理',
        path: '/manage',
        icon: 'ie'
      }
    ]
  },
  {
    name: '用户',
    path: '/user',
    icon: 'qq'
  },
  {
    name: '权限',
    path: '/rule',
    icon: 'facebook'
  },
  {
    name: '图标统计',
    path: '/chart',
    icon: 'apple',
    children: [
      {
        name: '饼状图',
        path: '/pie',
        icon: 'fall'
      },
      {
        name: '条形图',
        path: '/line',
        icon: 'rise'
      },
      {
        name: '柱状图',
        path: '/bar',
        icon: 'stock'
      }
    ]
  }
]