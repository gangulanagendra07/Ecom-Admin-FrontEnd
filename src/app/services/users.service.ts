import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as countriesLib from 'i18n-iso-countries';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL: any = environment.api_url;
  constructor(private http: HttpClient) {
    countriesLib.registerLocale(require("i18n-iso-countries/langs/en.json"));
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.API_URL}/users`);
  }
  getUsersCount(): Observable<any> {
    return this.http.get(`${this.API_URL}/users/get/count`);
  }
  createUser(user: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users`, user);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(`${this.API_URL}/users/${id}`);
  }
  deleteUser(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/users/${id}`);
  }
  updateUser(id: any, user: any): Observable<any> {
    return this.http.put(`${this.API_URL}/users/${id}`, user);
  }
  getCountry(countryKey: string): string {
    return countriesLib.getName(countryKey, 'en');
  }
  getCountries(): { id: string, name: string }[] {
    return Object.entries(countriesLib.getNames("en", { select: "official" })).map(entry => {
      return {
        id: entry[0],
        name: entry[1]
      }
    })
  }
  login(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users/login`, body)
  }
  register(body: any): Observable<any> {
    return this.http.post(`${this.API_URL}/users/register`, body)
  }

}
