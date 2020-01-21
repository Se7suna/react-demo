export function setUser (user) {
  window.localStorage.setItem('_user', JSON.stringify(user))
}

export function getUser () {
  return JSON.parse(window.localStorage.getItem('_user') || '{}')
}

export function removeUser () {
  window.localStorage.removeItem('_user')
}