import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  isMember = false;
  isManager = false;
  isAdmin = false;
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
    //   this.currentUser = JSON.parse(user);
    // });
    // if (this.currentUser.RoleId == '1') {
    //   this.isAdmin = true;
    // }
    // if (this.currentUser.RoleId == '2') {
    //   this.isManager = true;
    // }
    // if (this.currentUser.RoleId == '3') {
    //   this.isMember = true;
    // }
  }

  ngOnInit() {
    // if (sessionStorage.getItem('user')) {
    //   this.Users = sessionStorage.getItem('user');
    //   this.LisUser = this.Users.split(',');
    //   this.UserName = this.LisUser[1];
    //   this.UserId = this.LisUser[0];
    // } else {
    //   this.Users = null;
    // }
    
  }
  ngDoCheck(){
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
     
     
    } else {
      this.Users = null;
    }
  }
  logout() {
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    sessionStorage.removeItem('user');
  }

}