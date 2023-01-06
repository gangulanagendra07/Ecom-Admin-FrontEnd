import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  endSub$: Subject<any> = new Subject();
  registerForm!: FormGroup;
  errorMessage!: string;
  showSpinner = false;

  constructor(private fb: FormBuilder, private usersService: UsersService, private messageService: MessageService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.init();
    this.errorMessage = this.cookieService.get('register')
  }
  ngOnDestroy(): void {
    console.log('registered')
    this.endSub$.complete();
  }

  init() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      isAdmin: [false]

    })

  }

  onSignUp() {
    if (this.registerForm.invalid) {
      return
    }
    let body = {
      name: this.registerFormCtrl['name'].value,
      phone: this.registerFormCtrl['phone'].value,
      email: this.registerFormCtrl['email'].value,
      password: this.registerFormCtrl['password'].value,
      isAdmin: this.registerFormCtrl['isAdmin'].value
    }
    this.usersService.register(body).pipe(takeUntil(this.endSub$)).subscribe(data => {
      this.registerForm.reset();
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'User is Registered Successfully, Please Login Now.!'
      });
      timer(2000)
        .toPromise()
        .then(() => {
          this.router.navigateByUrl(`/login`);
        });
    },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'User Registered Failed'
        });
      })

  }
  get registerFormCtrl() {
    return this.registerForm.controls;
  }

}
