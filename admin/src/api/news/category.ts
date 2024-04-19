import request from "@/utils/request";

export const getNewsCategories = () => request({
  url: '/news/categories'
})

export const deleteNewsCategory = (type_id: number, parent_id?: number) => request({
  url: '/news/categories',
  method: 'delete',
  data: {
    type_id,
    parent_id
  }
})

export const createNewsCategory = (name: string | undefined, parent_id?: number | string) => request({
  url: '/news/categories',
  method: 'post',
  data: {
    name,
    parent_id
  }
})

export const updateNewsCategory = (name: string | undefined, parent_id?: number | string, type_id?: number | string) => request({
  url: '/news/categories',
  method: 'put',
  data: {
    name,
    parent_id,
    type_id
  }
})