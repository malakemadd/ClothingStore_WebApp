import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { product, products } from '../Models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  constructor(private myClinet: HttpClient) { }

  URL="http://localhost:5248/api/Product";

  getAllProducts(): Observable<product[]> {
    return this.myClinet.get<product[]>(this.URL, {withCredentials:true})
  }

  getSubCategoriesByCategory(categoryId: number): Observable<any> {
    return this.myClinet.get(`${this.URL}/GetSubCategoryByCatId/${categoryId}`, {withCredentials: true});
  }


  getCategories():Observable<any>{
    return this.myClinet.get(`${this.URL}/Categories`, {withCredentials:true})
  }

  getProdById(code:number){
    return this.myClinet.get(`${this.URL}/${code}`,{withCredentials:true})
  }

}
