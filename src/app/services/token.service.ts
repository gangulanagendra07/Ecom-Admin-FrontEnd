import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})

export class TokenService {

  constructor(private cookieService: CookieService) { }

  setToken(token: any) {
    return this.cookieService.set('Ecom-admin', token);
  }
  getToken() {
    return this.cookieService.get('Ecom-admin');
  }
  deleteToken() {
    return this.cookieService.delete('Ecom-admin');
  }
  getPayLoad() {
    let token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload;
  }
}
