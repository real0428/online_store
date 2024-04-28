interface AdImage {
  imgUrl: string
  url: string
  description: string
}

export interface AdData {
  type_id?: string
  type_name: string
  images: AdImage[]
}