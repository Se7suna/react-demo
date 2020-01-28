import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', { username, password })
export const reqCategory = parentId => ajax('/manage/category/list', { parentId }, 'GET')
export const reqChangeCategory = (categoryId, categoryName) => ajax('/manage/category/update', { categoryId, categoryName })
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', { parentId, categoryName })
export const reqGoodsList = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize }, 'GET')
export const reqSearchGoods = ({ pageNum, pageSize, productName, productDesc }) => ajax('/manage/product/search', { pageNum, pageSize, productName, productDesc }, 'GET')
export const reqSetStatus = (productId, status) => ajax('/manage/product/updateStatus', { productId, status })
export const reqTypeInfo = (categoryId) => ajax('/manage/category/info', { categoryId }, 'GET')
export const reqDelImg = (name) => ajax('/manage/img/delete', { name })
