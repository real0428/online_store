
import request from "../../utils/request"

export const getAdList = async () => request.get('/ads')

export const uploadAd = async (Ad: AdData) => {
  console.log(Ad)
  return request({
    url: '/ad',
    method: 'post',
    data: {
      ...Ad
    }
  })
}

export const deleteAd = async (id: number) => {
  return request({
    url: '/ad',
    method: 'delete',
    data: {
      type_id: id
    }
  })
} 