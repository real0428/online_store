
import request from "../../utils/request"
import type { AdData } from "@/types/ad"

export const getAdList = async () => request.get('/ads')

export const getAd = async (id: string) => request({
  url: `/ad?type_id=${id}`
})

export const uploadAd = async (ad: AdData) => {
  return request({
    url: '/ad',
    method: 'post',
    data: ad
  })
}

export const updateAd = async (ad: AdData) => {
  console.log(ad)
  return request({
    url: '/ad',
    method: 'put',
    data: ad
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