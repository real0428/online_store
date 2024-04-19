import request from '@/utils/request'
export const getUsers = () => request.get('https://randomuser.me/api/');

export const getAccessAuth = (form: any) => request({
  method: 'post',
  url: '/business_user/login',
  data: form
})

export const getUserInfo = () => request({
  url: '/business_user/info'
})

export const updateUserInfo = (form: any) => {
  const formData = new FormData()
  console.log(form.image);
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
