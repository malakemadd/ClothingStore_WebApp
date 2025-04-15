export type products = product[]

export interface product {
  code: number;          // lowercase to match DB
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  categoryid: number;    
  subcategoryid: number; 
  stock: number;
  size: number;    
  color: number;   
}

export enum Size {
  XS = 0,
  S = 1,
  M = 2,
  L = 3,
  XL = 4,
  XXL = 5
}

export enum Color {
  Black = 0,
  Blue = 1,
  Green = 2,
  Red = 3,
  Grey = 4,
  Yellow = 5,
  White = 6
}

// export enum Categories{
//   women=0,
//   Men=1,
//   Boys=2,
//   Girls=3
// }

// export enum WomenSubCategories {
//   Shirts = 0,
//   TShirts = 1,
//   Dresses = 2,
//   Skirts=3,
//   Pants=4,
//   Blouses=5
// }

// export enum MenSubCategories {
//   Shirts=6,
//   TShirts=7,
//   Vests=8,
//   Pants=9,
//   Pullovers=10,

// }

// export enum BoysSubCategories {
//   Shorts=16,
//   Pants=17,
//   TShirts=18,
//   Shirts=19,
//   Sweaters=20,

// }

// export enum GirlsSubCategories {
//   Shorts=11,
//   Skirts=12,
//   Dresses=13,
//   TShirts=14,
//   Pants=15

// }

export interface category {
  id: number;
  name: string;
}

export interface subcategory {
  id: number;
  name: string;
}