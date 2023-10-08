import axios from 'axios'
import { ElMessage } from 'element-plus'

let request = axios.create({
  baseURL: '',
  timeout: 5000
})

request.interceptors.request.use(config => {
  config.headers.Authorization = ''
  return config
})

request.interceptors.response.use(response => {
  return response.data
}, error => {
  const message = error.message;
  console.log(error);

  ElMessage({
    type: 'error',
    message,
  })
  return Promise.reject(error)
})

export default request