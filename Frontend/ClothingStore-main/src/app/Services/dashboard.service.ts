// filepath: src/app/services/dashboard.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = 'http://localhost:5248/api'; 

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Account/all-users`,{withCredentials:true});
  }

    getAllProducts(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/Product`,{withCredentials:true});
    }
    
    
    getAllOrders(): Observable<any[]> {
        return this.http.get<any[]>(`${this.baseUrl}/Order`,{withCredentials:true});
    }
    
    getAllCategories(): Observable<any[]> {
      //  return this.http.get<any[]>(`${this.baseUrl}/Category/GetSubCategories`);
      return this.http.get<any[]>(`${this.baseUrl}/Category`,{withCredentials:true});
    }

   
}
