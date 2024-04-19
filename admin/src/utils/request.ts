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

request.interceptors.response.use(response => {
  return response.data
}, error => {
  console.log(error);
  const message = error.response.data.message;
  ElMessage({
    type: 'error',
    message,
  })
  const { clearToken } = useAuthStore()
  setTimeout(() => {
    clearToken()
  }, 1000)
  return Promise.reject(error)
})

export default request