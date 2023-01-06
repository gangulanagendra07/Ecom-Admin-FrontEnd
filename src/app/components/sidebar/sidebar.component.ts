import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private router: Router, private tokenService: TokenService, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  LogOut() {
    this.tokenService.deleteToken();
    this.cookieService.delete('register');
    this.router.navigateByUrl('login');
  }

}
