import ajax from './ajax'

export const reqLogin = (username, password) => ajax('/login', { username, password })
export const reqCategory = parentId => ajax('/manage/category/list', { parentId }, 'GET')
export const reqChangeCategory = (parentId, id, name) => ajax('/change/category', { parentId, id, name })