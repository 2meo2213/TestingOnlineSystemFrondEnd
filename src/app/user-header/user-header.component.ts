import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  // currentUser: User;
  // currentUserSubscription: Subscription;
  gotoLogin: boolean;
  
 
 
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
 

  constructor(private http: HttpClient, private router: Router,private myservice:MyserviceService) {
   
   
  //   this.router.events.subscribe((event) => {
  //     this.myservice.changeMessage('2');
  //  });
  }

  ngOnInit() {
    this.myservice.changeMessage('2');
  }
  

  
  Logout(){
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    location.reload();

    sessionStorage.removeItem('user');
  }
  ngDoCheck(){
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
      this.myservice.changeMessage('2');
     
    } else {
      this.myservice.changeMessage('2');
      this.Users = null;
    }
  }
  login() {
   
    this.router.navigate(['login']);
  }

}
