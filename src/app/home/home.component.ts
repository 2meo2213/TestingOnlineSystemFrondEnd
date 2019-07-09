import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from '../user';
import { Isemaster } from '../isemaster';
import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  gotoLogin: boolean;
  image = [
    '../../assets/image/slider1.png',
    '../../assets/image/slider2.png',
    '../../assets/image/slider3.png'
  ];
  currentSlide = 0;
  tests;
  semesterExamCode = '';
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  semester:Isemaster;
  semesters :Isemaster [] = [];

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService,
    private toasr: ToastrService,private myservice:MyserviceService) {
    this.changeSlide();
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.gotoLogin = this.authenticationService.gotoLogin;
    
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
   });
  }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/SemesterCustomer',{ headers: http() }).subscribe(
      value => {

        this.semesters = JSON.parse(value).Data;
        console.log(value);
      });
     
  }
  ngDoCheck() {
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
     
     
    } else {
      this.Users = null;
    }
    
  }
  changeSlide() {
    this.currentSlide++;
    if (this.currentSlide > 3) {
      this.currentSlide = 1;
    }

    // console.log(this.currentSlide);

    setTimeout(() => {
      this.changeSlide();
    }, 3000);

    // this.sharedService.isAuthentication.subscribe(
    //   isAuthentication => (this.isAuthentication = isAuthentication)
    // );

    const isAuthen = localStorage.getItem('isAuthen');
    // if (isAuthen === 'true') {
    //   this.route.navigate(['/exam']);
    // }
  }

  showSemesterTest() {
    if (this.semesterExamCode == '') {
       this.toasr.warning('You Must Input Code');
    }else if(this.semesterExamCode !== '') {
      this.http.get<string>('http://localhost:65170/api/SemesterCustomer?code=' + this.semesterExamCode,{ headers: http() })
      .subscribe(value => {
        this.semesters = JSON.parse(value).Data;
        console.log(value);
      }     
      );
    }else{
    this.toasr.error('');
    }
  }
  Logout(){
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    location.reload();

    sessionStorage.removeItem('user');
  }
  change(e) {
    this.semesterExamCode = e.value;
    console.log(this.semesterExamCode);
  }

  signIn() {
    // this.sharedService.authentic(true);
    // localStorage.setItem('isAuthen', 'true');
    // this.route.navigate(['/exam']);
  }
  login() {
    this.authenticationService.gotoLogin = true;
    this.router.navigate(['login']);
  }


}
