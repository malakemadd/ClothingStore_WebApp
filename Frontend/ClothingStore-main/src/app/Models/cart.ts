export type Orders = Cart[]




export interface Cart {
    id: number
    orderDate: Date
    totalAmount: number
    method: PaymentMethod
    billignAddress: string
    stripedetails: string
    orderItems: OrderItem[] 
  }
  
  export interface CartWithExpandable extends Cart {
    IsExpanded: boolean;
  }
  export  type expandableOrders = CartWithExpandable[]

  export interface OrderItem {
    id:number
    name: string
    imageUrl: string
    quantity: number
    price: number
  }
  
  export enum SortDirection {
    Product = 'product',
    Quantity = 'quantity',
    Total = 'total',
    Date='date',
    None='none'
}
export interface Login {
  usernameOrEmail: string
  password: string
  rememberMe: boolean
}
export enum PaymentMethod {
  OnDelivery = 0,
  CreditCard =1,
  Stripe = 2
}
export interface url{
  url:string
}
export interface AddressForm {
  country: string;  
  streetAddress: string;  
  apartment?: string;  
  city: string;  
  state: string;  
  postcode: string;  
  addNote: boolean;  
  orderNotes?: string;  
}
export interface BillingDetails {
  country: string;
  streetAddress: string;
  apartment?: string; // optional
  city: string;
  state: string;
  postcode: string;
  addNote: boolean;
  orderNotes?: string; // optional
  method: PaymentMethod;
  paymentdetails?:string;
}