import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  // API_URL: any = 'http://localhost:3000/api/v1';
  API_URL: any = environment.api_url;
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<any> {
    return this.http.get(`${this.API_URL}/categories`);
  }
  getCategory(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/categories/${id}`);
  }
  addCategory(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/categories`, body);
  }
  deleteCategory(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/categories/${id}`);
  }
  updateCategory(id: any, body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/categories/${id}`, body);
  }
}
