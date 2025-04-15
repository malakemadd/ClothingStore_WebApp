import { Size } from "./product"


export type Reviews = Review[]

export interface Review {
  userName: string
  productname: string
  productId: number
  userId: string
  reviewDate: Date
  comment: string
  rating: number
    id: number
    ismine: boolean
}




export interface ReviewPost {
    productId: number
    comment: string
    rating: number
   
  }

  export interface product {
    code: number
    name: string
    description: string
    price: number
    size: Size
    color: number
    imageUrl: string
    comments: any[]
    category: string
    images: string[]
    stock:number
  }



  export interface Comment {
    comment: string
    reviewDate: string
    userName: string
    rating: number
  }



  export interface AddToCartRequest {
    productId: number;
    quantity: number;
}
