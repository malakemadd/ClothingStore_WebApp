import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl = 'http://localhost:5248/api/WishList'; 
  prdId: Number = 0; //  match .NET DTO
  // prdName: string = '';
  // prdImg: string = '';
  // prdDes: string = '';
  userId: string = '';

  constructor(private http: HttpClient) {}
  
  // prdName: string, prdImg: string, prdDes: string
  addToWishlist(productId: number ): Observable<any> {
  //   const userId = sessionStorage.getItem('userId');
  //   const token = localStorage.getItem('token');
  
  //   if (!userId) {
  //     console.error('User ID not found! Cannot add to wishlist.');
  //     return throwError(() => new Error('User ID not found!'));;
  //   }
  
  //   const wishlistData = {
  //     prdId: productId, // Ensure it matches the backend DTO
  //     // prdName: prdName,
  //     // prdImg: prdImg,
  //     // prdDes: prdDes,
  //     userId: userId
  //   };
  //   // Set Authorization header
  // const headers = new HttpHeaders({
  //   'Authorization': `Bearer ${token}`, // Ensure token exists
  //   'Content-Type': 'application/json'
  // });
  
  //   console.log('Adding to wishlist:', wishlistData);
  // let prodid=productId;
  // let wish: Wishlist|null =null;
  // wish.ProdId=productId;
  // console.log(prodid,"asdpioasdiopas");
    return this.http.post(`${this.apiUrl}/create`,{"prodid":productId}
      , { headers: { 'Content-Type': 'application/json' }, withCredentials:true }).pipe(
      tap(response => console.log('Item added to wishlist:', response)),
      catchError(error => {
        console.error('Failed to add item to wishlist:', error);
        return throwError(() => error);
      })
    );
  
  }
  
  
  getWishlist(): Observable<any[]> {
    // const userId = sessionStorage.getItem('userId'); 
    // console.log('User ID:', userId);
  
    // if (!userId) {
    //   console.error('No user ID found!');
    //   return new Observable<any[]>(); 
    // }
  
    return this.http.get<any>(`${this.apiUrl}/GetFavoriteByUserId`, {withCredentials:true}).pipe(
      tap(response => console.log('API Response:', response)), 
      map(response => response || []) 
    );
  }

 
  
  removeFromWishlist(productId: number): Observable<any> {
    console.log('Attempting to remove product ID:', productId);
    
    if (!productId) {
      console.error('Invalid product ID:', productId);
      return throwError(() => new Error('Invalid product ID'));
    }
  
    return this.http.delete(`${this.apiUrl}/Delete`, { params: { productId: productId},withCredentials:true },).pipe(
      tap(() => console.log(`Product ID ${productId} removed successfully`)),
      catchError(error => {
        console.error('Failed to remove item from wishlist:', error);
        return throwError(() => error);
      })
    );
  }
  
}
