import axios from 'axios'

const instance = axios.create({
  headers: { 'X-Custom-Header': 'test' }
});

export default function ajax (url, data = {}) {
  return new Promise((resolve, reject) => {
    instance.post(url, data).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}