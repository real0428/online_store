import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useAuthStore } from '@/stores/user'

let request = axios.create({
  baseURL: 'http://127.0.0.1/api',
  timeout: 5000
})

request.interceptors.request.use(config => {
  config.headers.Authorization = JSON.parse(localStorage.getItem('user') as string)?.token || ''
  return config
})

let refresh = false
request.interceptors.response.use(response => {
  return response.data
}, async error => {
  const message = error.response.data.message;
  if (error.response.status === 401 && !refresh) {
    refresh = true
    const { REFRESH_TOKEN, CLEAR_TOKEN } = useAuthStore()
    const { status } = await REFRESH_TOKEN()
    if (status === 0) {
      refresh = false
      return request(error.config)
    } else {
      ElMessage({
        type: 'error',
        message,
      })
      setTimeout(() => {
        CLEAR_TOKEN()
      }, 1000)
    }
  }
  refresh = false
  return Promise.reject(error)
})

export default request