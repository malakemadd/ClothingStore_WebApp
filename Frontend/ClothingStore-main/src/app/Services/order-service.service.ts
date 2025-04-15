import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BillingDetails, Cart, expandableOrders, Orders, url } from '../Models/cart';
import { catchError, concatMap, EMPTY, map, Observable, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private myclient: HttpClient) {}
  getOrdersURL="http://localhost:5248/api/Order"
  getCartURL="http://localhost:5248/api/Order/GetCart"
   emptyCartURL="http://localhost:5248/api/Order/EmptyCart"
   confirmorderurl="http://localhost:5248/api/Order"
  getCart():Observable<Cart> 
  {
   
    // return this.myclient.post("http://localhost:5248/api/Account/FakeLogin", null, { withCredentials: true }).pipe(
    //   tap(() => console.log("FakeLogin successful")), 
    //   catchError(error => {
    //     console.error("FakeLogin failed:", error); 
    //     return EMPTY; // Prevents app from breaking
    //   }),
    //   concatMap(() => 
        return this.myclient.get<Cart>(this.getCartURL, { withCredentials: true })
    //);
    

  }


  confirmorder(billdetails: BillingDetails): Observable<void> {
    return this.myclient.post<void>(this.confirmorderurl, billdetails, { withCredentials: true }).pipe(
      tap(() => console.log("Order confirmed successfully")),
      catchError(error => {
        console.error("Order confirmation failed:", error);
        return EMPTY; // Prevents app from breaking
      })
    );
}


confirmorderstripe(billdetails: BillingDetails): Observable<url> {
  const successurl = "http://localhost:4200/success";  // Success URL
  const urlWithParams = `${this.confirmorderurl}?successurl=${encodeURIComponent(successurl)}`;  // Encode the URL parameter

  return this.myclient.post<url>(urlWithParams, billdetails, { withCredentials: true }).pipe(
    tap(() => console.log("Stripe order confirmation successful")),
    catchError(error => {
      console.error("Stripe order confirmation failed:", error);
      return EMPTY; // Prevents app from breaking
    })
  );
}
  
getOrders(): Observable<expandableOrders> {
  return this.myclient.get<Orders>(this.getOrdersURL, { withCredentials: true }).pipe(
    map(orders => orders.map(cart => ({
      ...cart,            
      IsExpanded: false   
    }))),
    tap(() => console.log("Fetched orders successfully")),
    catchError(error => {
      console.error("Failed to fetch orders:", error);
      return EMPTY; 
    })
  );
}


getAllOrders(): Observable<expandableOrders> {
  return this.myclient.get<Orders>("http://localhost:5248/api/Order/All", { withCredentials: true }).pipe(
    map(orders => orders.map(cart => ({
      ...cart,            
      IsExpanded: false   
    }))),
    tap(() => console.log("Fetched all orders successfully")),
    catchError(error => {
      console.error("Failed to fetch all orders:", error);
      return EMPTY; // Prevents app from breaking
    })
  );
}



  clear():Observable<Cart>
  {
    return this.myclient.put<Cart>(this.emptyCartURL,{}, { withCredentials: true }).pipe(
      map((cart: Cart) => ({
        ...cart,
        orderDate: new Date(cart.orderDate) 
      })) 
    );
  }
 
}
