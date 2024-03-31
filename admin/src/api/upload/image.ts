import request from "@/utils/request";

export const uploadImage = (file: any) => {
  const formData = new FormData()
  formData.append('file', file)
  return request({
    method: 'post',
    url: '/upload_image',
    data: formData
  })
} 
