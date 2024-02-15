type ICreateProduct = {
  title: string
  description: string
  price: number
  image?: string
  seller: string
}

interface IProduct extends ICreateProduct {
  id: string
}

export type { ICreateProduct, IProduct }
