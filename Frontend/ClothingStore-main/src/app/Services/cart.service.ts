import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToCart } from '../Models/AddToCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private myClient:HttpClient) { }

  URL="http://localhost:5248/api/OrderItems"


  AddToCart( c:AddToCart){
    return this.myClient.post<any>(this.URL,c,{withCredentials:true,responseType: 'text' as 'json'})
  }

}
