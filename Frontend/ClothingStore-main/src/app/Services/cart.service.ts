import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddToCart } from '../Models/AddToCart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private myClient:HttpClient) { }

  URL="http://lastclothinghabashi.runasp.net/api/OrderItems"


  AddToCart( c:AddToCart){
    return this.myClient.post<any>(this.URL,c,{withCredentials:true,responseType: 'text' as 'json'})
  }

}
