import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Ecommerce-Admin';
  constructor(private router: Router, private tokenService: TokenService, private cookieService: CookieService) { }

  ngOnInit() {
    const token = this.tokenService.getToken();
    if (!token) {
      this.router.navigateByUrl('/login')
    }
  }

}
