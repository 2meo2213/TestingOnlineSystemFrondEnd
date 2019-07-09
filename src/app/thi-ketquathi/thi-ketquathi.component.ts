import { Component, OnInit } from '@angular/core';
import{Iresult} from '../iresult';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-thi-ketquathi',
  templateUrl: './thi-ketquathi.component.html',
  styleUrls: ['./thi-ketquathi.component.scss']
})
export class ThiKetquathiComponent implements OnInit {

list:Iresult={} as Iresult;
formApply: FormGroup;
Users: string;
LisUser;
UserId: string;
UserName: string;
Id = this.activatedRoute.snapshot.paramMap.get('Id');

get TestName(): FormControl {
  return this.formApply.get('TestName') as FormControl
}
get FullName(): FormControl {
  return this.formApply.get('FullName') as FormControl
}
get Email(): FormControl {
  return this.formApply.get('Email') as FormControl
}
get SemesterName(): FormControl {
  return this.formApply.get('SemesterName') as FormControl
}
get Score(): FormControl {
  return this.formApply.get('Score') as FormControl
}
get Category(): FormControl {
  return this.formApply.get('Category') as FormControl
}


  constructor(private myservice:MyserviceService, private result:FormBuilder ,private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
   });
   }

  ngOnInit() {
    this.formApply=this.result.group({
      TestName: [''],
      FullName: [''],
      Email: [''],
      SemesterName: [''],
      Score: [''],
      Category: [''],
    });
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
     
     
    } else {
      this.Users = null;
    }
    this.http
    .get<string>('http://localhost:65170/semesterExam/result/' + this.Id+'?userId='+this.UserId,{ headers: http() })
    .subscribe(
      value => {
        this.list = JSON.parse(value);
    
        console.log(this.list);
      
        
        this.formApply.patchValue(this.list);//a tiep
      }
    );
  
  }

  
  Logout(){
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    location.reload();

    sessionStorage.removeItem('user');
  }
}
