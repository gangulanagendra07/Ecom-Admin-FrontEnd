import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  API_URL: any = environment.api_url;
  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<any> {
    return this.http.get(`${this.API_URL}/orders`);
  }
  getTotalSales(): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/get/totalsales`);
  }
  getCount(): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/get/count`);
  }
  getUsersOrders(userid: any): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/get/userorders/${userid}`);
  }
  getOrder(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/orders/${id}`);
  }
  addOrders(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/orders`, body);
  }
  deleteOrders(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/orders/${id}`);
  }
  updateOrder(id: any, body: any): Observable<any> {
    return this.http.put(`${this.API_URL}/orders/${id}`, body);
  }

}
