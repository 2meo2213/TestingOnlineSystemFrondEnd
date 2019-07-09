import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {

private messageSource = new BehaviorSubject('true');
  currentMessage = this.messageSource.asObservable();
private errorSource=new BehaviorSubject('');
currentError=this.errorSource.asObservable();
  constructor(private router:Router) { }
 
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  changeError(error:string){
    this.errorSource.next(error);
    this.router.navigateByUrl('/error')
  }
}
