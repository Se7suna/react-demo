import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', { username, password })
export const reqCategory = parentId => ajax('/manage/category/list', { parentId }, 'GET')
export const reqChangeCategory = (categoryId, categoryName) => ajax('/manage/category/update', { categoryId, categoryName })
export const reqAddCategory = (parentId, categoryName) => ajax('/manage/category/add', { parentId, categoryName })
export const reqGoodsList = (pageNum, pageSize) => ajax('/manage/product/list', { pageNum, pageSize }, 'GET')
