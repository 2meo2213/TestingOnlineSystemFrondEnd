import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { ObjectResult } from '../object-result';
import { CookieService } from 'ngx-cookie-service';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  userId: string;
  currentUser:string;
  passwordPattern = "^[a-z0-9_@A-Z]*$";
  usernamePattern = "^[a-z0-9_@A-Z]*$";
  get username(): FormControl {
    return this.loginForm.get('username') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  get rememberMe(): FormControl {
    return this.loginForm.get('rememberMe') as FormControl;
  }
  constructor(private fb: FormBuilder, private http: HttpClient,
    private router: Router, private route: ActivatedRoute,private myservice:MyserviceService, private authenticationService: AuthenticationService, private cookieService: CookieService) {
    if (sessionStorage.getItem('currentPermission')) {
      this.router.navigate(['']);
    }
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
   });
  }

  ngOnInit() {
    if (this.cookieService.check('username')) {
      this.loginForm = this.fb.group({
        username: this.fb.control(this.cookieService.get('username'), [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern(this.usernamePattern)
        ]),
        password: this.fb.control(this.cookieService.get('password'), [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern(this.passwordPattern)
        ]),
        rememberMe: this.fb.control(true)
      });
    } else {
      this.loginForm = this.fb.group({
        username: this.fb.control('', [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern(this.usernamePattern)
        ]),
        password: this.fb.control('', [
          Validators.required,
          Validators.maxLength(15),
          Validators.minLength(5),
          Validators.pattern(this.passwordPattern)
        ]),
        rememberMe: this.fb.control(false)
      });
    }
    
   

   
         
  }
  // onSubmit() {
  //   this.submitted = true;
  //   this.loading = true;
  //   console.log(this.loginForm);
  //   if (this.loginForm.invalid) {
  //     return;
  //   } else {
  //     this.authenticationService.login(this.username.value, this.password.value, this.rememberMe.value)
  //       .pipe(first())
  //       .subscribe(
  //         value => {
  //           if (value == 'null') {
  //             this.loading = false;
  //           } else this.router.navigate(['']);
  //         });
  //   }
  //   console.log(this.loading);
  // }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.loginForm.valid) {

      const value = this.loginForm.value;
      
      this.http.post<ObjectResult>('http://localhost:65170/api/Login', JSON.stringify(value), httpOptions).subscribe({
        next: (res) => {
          
          if (res.Success === 1) {
            
            this.userId = JSON.parse( res.Data).Name;
            this.http.get<string>('http://localhost:65170/api/User/'+this.userId+'?action=GetUser' ).subscribe(
              value => {
                
                this.currentUser = JSON.parse(value).UserName  ;
                var userName= this.userId +','+this.currentUser;
                sessionStorage.setItem('user', userName );
             
                console.log(userName);
              });
        
            sessionStorage.setItem('currentPermission', res.Data);
            const sessionId = sessionStorage.getItem('currentPermission');
            // debugger;
            const httpOptions1 = {
              headers: new HttpHeaders({ 'Content-Type': 'application/json', 'permission': sessionId })
            };
            this.http.get<string>('http://localhost:65170/api/group', httpOptions1).subscribe((val) => {
              // debugger;
              console.log(JSON.parse(val));
            });
            // add cookie
            if (this.rememberMe.value == true) {
              this.cookieService.set('username', this.username.value);
              this.cookieService.set('password', this.password.value);
            } else {
              this.cookieService.delete('username');
              this.cookieService.delete('password');
            }
            //
            this.router.navigate(['']);
         
          } else {
            // check looix
            this.loading = false;
          }
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

  }
}