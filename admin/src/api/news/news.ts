import request from "@/utils/request";

export const createNews = (form: any) => {
  const formData = new FormData()
  formData.append('title', form.title)
  formData.append('description', form.description)
  formData.append('image', form.image)
  formData.append('body', form.body)
  formData.append('type_id', form.type_id)
  formData.append('is_active', form.is_active)

  return request({
    method: 'post',
    url: '/news/post',
    data: formData
  })
}

export const updateNews = (form: any) => {
  const formData = new FormData()
  formData.append('item_id', form.item_id)
  formData.append('title', form.title)
  formData.append('description', form.description)
  if (form.image) {
    formData.append('image', form.image)
  }
  formData.append('body', form.body)
  formData.append('type_id', form.type_id)
  formData.append('is_active', form.is_active)
  return request({
    method: 'put',
    url: '/news/post',
    data: formData,
  })
}

export const deleteNews = (id: number) => request({
  method: 'delete',
  url: '/news/post',
  data: { item_id: id }
})

export const getNewsInfo = (newsId: number) => request({
  url: `/news/post/${newsId}`
})

export const getNewsList = () => request({
  url: '/news/post'
})