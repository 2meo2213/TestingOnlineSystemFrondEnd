import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { MatTableDataSource } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
import { Router } from '@angular/router';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export class exam {
  Id: number;
  NameExam: string;
  CreateBy: number;
  QuestionNumber: number;
  Status: number;
  TypeExam: string;
  CreateAt: Date;
  Note: string;

}
export class semaster {
  ID: number;
  SemesterName: string
}
@Component({
  selector: 'app-list-create',
  templateUrl: './list-create.component.html',
  styleUrls: ['./list-create.component.scss']
})
export class ListCreateComponent implements OnInit {
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  //name:string;
  currentUser: User;
  currentUserSubscription: Subscription;
  isMember = false;
  isManager = false;
  isAdmin = false;
  exams: exam[] = [];
  form: FormGroup;
  semasters: semaster[] = [];
  constructor(private myservice: MyserviceService, private router: Router, private insert: FormBuilder, private http: HttpClient, private toar: ToastrService, private authenticationService: AuthenticationService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }


  validateForm() {
    if (this.form.invalid) {
      this.form.get('TestTime').markAsTouched();
      this.form.get('TotalTest').markAsTouched();
      this.form.get('ExamId').markAsTouched();
      this.form.get('SemasterExamId').markAsTouched();
      this.form.get('TestName').markAsTouched();
      this.form.get('CreateBy').markAsTouched();
      this.form.get('PassScore').markAsTouched();
      this.form.get('Status').markAsTouched();
      return;
    }
    // do something else
  }
  regTotal = "^[0-9]{1,2}$";
  regPassScore = "^[0-9]{1,3}$"

  ngOnInit() {
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];


    } else {
      this.Users = null;
    }
    console.log('' + this.UserName);
    this.form = this.insert.group({
      ExamId: ['', [Validators.required]],
      SemasterExamId: ['', [Validators.required]],
      TestName: ['', [Validators.required, Validators.maxLength(50)]],

      CreateBy: [this.UserName],

      PassScore: ['', [Validators.required, Validators.pattern]],
      TotalTest: ['', [Validators.required, Validators.pattern]],
      Status: ['', [Validators.required]],
      TestTime: ['', [Validators.required, Validators.pattern]],

    });

    this.http.get<string>('http://localhost:65170/api/exam', { headers: http() }).subscribe(
      value => {
        this.exams = JSON.parse(value);
      }, err => {
        var errors = err.status + ',' + err.message;
        this.myservice.changeError(errors);
      });

    this.http.get<string>('http://localhost:65170/api/Semaster', { headers: http() }).subscribe(
      value => {
        this.semasters = JSON.parse(value);


      }, err => {
        var errors = err.status + ',' + err.message;
        this.myservice.changeError(errors);



      });

  }
  get exam(): FormControl {
    return this.form.get('ExamId') as FormControl;
  }
  get Semaster(): FormControl {
    return this.form.get('SemasterExamId') as FormControl;
  }
  get name(): FormControl {
    return this.form.get('TestName') as FormControl;
  }
  get StartDate(): FormControl {
    return this.form.get('StartDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.form.get('EndDate') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.form.get('CreateBy') as FormControl;
  }

  get PassScore(): FormControl {
    return this.form.get('PassScore') as FormControl;
  }
  get TotalTest(): FormControl {
    return this.form.get('TotalTest') as FormControl;
  }
  get status(): FormControl {
    return this.form.get('Status') as FormControl;
  }
  get TestTime(): FormControl {
    return this.form.get('TestTime') as FormControl;
  }
  onSubmit() {


    if (this.form.valid) {
      const value = this.form.value;

      this.http.post('http://localhost:65170/api/Test', JSON.stringify(value), { headers: http() }).subscribe({
        next: (response) => {
          if (response ==1) {
            this.toar.success('Successful', ' Create Test');
            // this.toar.warning('something went wrong', ' Create Test');
          } else {
            var errorss=201+','+JSON.parse(response.toString()).Message;
          this.myservice.changeError(errorss);
          }
          console.log('dsds'+response)

        },

        error: (err) => {

          var errors = err.status + ',' + err.message;
          this.myservice.changeError(errors);
        }

      });
      console.log(this.form.value);
    }

  }

}
