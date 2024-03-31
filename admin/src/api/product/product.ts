import request from "../../utils/request";
export const createProduct = (form: any) => {
  const formData = new FormData()
  formData.append('name', form.name)
  formData.append('description', form.description)
  formData.append('image', form.image)
  formData.append('ori_price', form.ori_price)
  formData.append('sale_price', form.sale_price)
  formData.append('stock', form.stock)
  formData.append('body', form.body)
  formData.append('type_id', form.type_id)
  formData.append('is_active', form.is_active)

  return request({
    method: 'post',
    url: '/product/item',
    data: formData
  })
}

export const getProductInfo = (itemId: number) => request({
  method: 'get',
  url: `/product/item/${itemId}`,
})

export const updateProductInfo = (form: any) => {
  const formData = new FormData()
  formData.append('item_id', form.item_id)
  formData.append('name', form.name)
  formData.append('ori_price', form.ori_price)
  formData.append('sale_price', form.sale_price)
  formData.append('stock', form.stock)
  formData.append('description', form.description)
  if (form.image) { formData.append('image', form.image) }
  formData.append('body', form.body)
  formData.append('type_id', form.type_id)
  formData.append('is_active', form.is_active)

  return request({
    method: 'put',
    url: '/product/item',
    data: formData
  })
}

export const deleteProduct = (item_id: number) => request({
  method: 'delete',
  url: '/product/item',
  data: {
    item_id
  }
})

export const getProductList = () => request({
  method: 'get',
  url: '/product/item'
})

