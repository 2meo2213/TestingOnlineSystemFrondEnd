import { Component, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { AuthenticationService } from './_services/authentication.service';
import { Subscription } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { http } from './http-header';
import { MyserviceService } from './myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  message;
  currentUser : User;
 checked:boolean;
 Users:string;
 changeDetected=true;
  // initUser(value: User) {
  //   this.currentUser = value;
  // }
  // currentUserSubscription: Subscription;

  constructor(
    private authenticationService: AuthenticationService,private http: HttpClient,private myservice:MyserviceService,private router: Router
  ) {
    this.router.events.subscribe((event) => {
      this.changeDetected=false;
   });
  }
  
 
ngDoCheck(){
   
 
  if(!this.changeDetected){
    
    if(this.message==1){
      this.message=true;
    }else{
      this.message=false
    }
    this.changeDetected=true;
   
  }
    
    this.changeDetected = false;
     
}

  ngOnInit() {
    this.myservice.currentMessage.subscribe(message => this.message = message);
 
  }
}

