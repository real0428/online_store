import request from '@/utils/request'

export const getTokens = (form: any) => request({
  method: 'post',
  url: '/business_user/login',
  data: form
})

export const refreshToken = (token: string) => request({
  method: 'post',
  url: '/business_user/refresh_token',
  data: {
    refresh_token: token
  }
})

export const getUserInfo = () => request({
  url: '/business_user/info'
})

export const updateUserInfo = (form: any) => {
  const formData = new FormData()
  formData.append('username', form.username)
  if (form.image) {
    formData.append('image', form.image)
  }
  formData.append('email', form.email)
  formData.append('nickname', form.nickname)

  return request({
    method: 'put',
    url: '/business_user/info',
    data: formData
  })
} 
