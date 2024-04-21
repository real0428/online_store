interface AdImage {
  imgUrl: string
  url: string
  description: string
}

interface AdData {
  type_id?: string
  type_name: string
  images: AdImage[]
}