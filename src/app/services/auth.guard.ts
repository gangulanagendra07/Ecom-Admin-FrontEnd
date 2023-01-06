import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenService: TokenService, private cookieService: CookieService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = this.tokenService.getToken();
    const tokenDecoded = JSON.parse(atob(token.split('.')[1]));
    if (tokenDecoded.isAdmin && !this._tokenExpiration(tokenDecoded.exp)) {
      return true;
    }
    else {
      this.router.navigateByUrl('register');
      this.cookieService.set('register', 'true');
      return false;
    }
  }
  private _tokenExpiration(expression: any): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expression;
  }

}
