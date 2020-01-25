import axios from 'axios'

const instance = axios.create({
  baseURL: '',
  headers: { 'X-Custom-Header': 'test' }
});

export default function ajax (url, data = {}, type) {
  return new Promise((resolve, reject) => {
    let promise = type ? instance.get(url, { params: data }) : instance.post(url, data)
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}