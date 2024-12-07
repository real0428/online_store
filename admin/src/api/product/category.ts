import request from "../../utils/request";
import type {Category} from "@/types/category";

export const getProductCategories = () => request<Category[]>({
  url: '/product/categories'
})

export const deleteProductCategory = (type_id: number, parent_id?: number) => request({
  url: '/product/categories',
  method: 'delete',
  data: {
    type_id,
    parent_id
  }
})

export const createProductCategory = (name: string | undefined, parent_id?: number | string) => request({
  url: '/product/categories',
  method: 'post',
  data: {
    name,
    parent_id
  }
})

export const updateProductCategory = (name: string | undefined, parent_id?: number | string, type_id?: number | string) => request({
  url: '/product/categories',
  method: 'put',
  data: {
    name,
    parent_id,
    type_id
  }
})