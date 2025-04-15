import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cart } from '../Models/cart';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

  constructor(private myclient: HttpClient) { }

  deleteURL="http://localhost:5248/api/OrderItems"

  deleteitem(id:number)
  {
    
    
    return this.myclient.delete(`${this.deleteURL}/${id}`, { withCredentials: true })
  }
  increase(id:number)
  {
    return this.myclient.put<Cart>(`${this.deleteURL}/Increase/${id}`,null, { withCredentials: true })
  }
  decrease(id:number)
  {
    return this.myclient.put<Cart>(`${this.deleteURL}/Decrease/${id}`,null, { withCredentials: true })
  }
}
