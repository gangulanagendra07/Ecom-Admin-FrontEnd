import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  endSub$: Subject<any> = new Subject()
  loginForm!: FormGroup;
  errorMessage!: string;
  showSpinner = false;

  constructor(private fb: FormBuilder, private usersService: UsersService, private router: Router, private messageService: MessageService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnDestroy(): void {
    // this.endSub$.next();
    console.log("destroying")
    this.endSub$.complete();

  }

  init() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }
    let body = {
      email: this.loginFormCtrl['email'].value,
      password: this.loginFormCtrl['password'].value,
    }
    this.usersService.login(body).pipe(takeUntil(this.endSub$)).subscribe(data => {
      console.log(data);
      this.errorMessage = "";
      this.tokenService.setToken(data.token);
      this.loginForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User Logged in Successfully.!'
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.router.navigateByUrl('/');
        });
    },
      (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login Failed'
        });
        this.errorMessage = err.error.message;
      })
  }

  get loginFormCtrl() {
    return this.loginForm.controls;
  }

}
