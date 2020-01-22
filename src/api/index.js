import ajax from './ajax'

export const reqLogin = (userName, pwd) => ajax('/login', { userName, pwd })
export const reqCategory = id => ajax('/getCatgory', { id })
export const reqChangeCategory = (parentId, id, name) => ajax('/change/category', { parentId, id, name })