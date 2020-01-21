import ajax from './ajax'

export const reqLogin = (userName, pwd) => ajax('/login', { userName, pwd })
export const reqTest = () => ajax('/test')