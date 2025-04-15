import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OneProductService {

  constructor(private myClient:HttpClient) { }

  // URL="http://localhost:5248/api/WishList"

  // AddToFav(){
  //   return this.myClient.post(this.URL,{withCredentials:true})
  // }



}
