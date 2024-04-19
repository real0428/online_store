interface AdImage {
  imgUrl: string
  url: string
  description: string
}

interface AdData {
  type_name: string
  ads: AdImage[]
}