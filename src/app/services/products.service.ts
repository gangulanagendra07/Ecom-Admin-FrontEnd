import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API_URL: any = environment.api_url;
  constructor(private http: HttpClient) { }


  getAllProducts(): Observable<any> {
    return this.http.get(`${this.API_URL}/products`);
  }
  getProductById(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/products/${id}`);
  }
  getProductsCount(): Observable<any> {
    return this.http.get(`${this.API_URL}/products/get/count`);
  }
  createProduct(product: any): Observable<any> {
    return this.http.post(`${this.API_URL}/products`, product);
  }
  updateProduct(productId: any, productData: any): Observable<any> {
    return this.http.put(`${this.API_URL}/products/${productId}`, productData);
  }
  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/products/${id}`);
  }

}
