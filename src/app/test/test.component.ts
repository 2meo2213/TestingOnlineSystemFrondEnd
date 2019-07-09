import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  form: FormGroup;
  
  constructor(private myservice:MyserviceService, private router: Router,private insert: FormBuilder, private http: HttpClient) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }



  ngOnInit() {
    this.form = this.insert.group({
      ExamId: ['', [Validators.required]],
      SemesterExam_ID: ['', [Validators.required]],
      TestName: ['', [Validators.required]],
      StartDate: ['', ],
      EndDate: ['', ],
      CreateBy: ['', [Validators.required]],
      
      PassScore: ['', [Validators.required]],
      NumberTime: ['', [Validators.required]],
      Status: ['', [Validators.required]],
      TestTime: ['', [Validators.required]],

    });
    this.http.get<string>('http://localhost:65170/api/Question', { headers: http() }).subscribe(
      value => {
        
      },
      err=>{
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
        });
  }
  get exam(): FormControl {
    return this.form.get('ExamId') as FormControl;
  }
  get Semaster(): FormControl {
    return this.form.get('SemesterExam_ID') as FormControl;
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
    return this.form.get('NumberTime') as FormControl;
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
          console.log(response);
          console.log('ok');
        },
        error: (err) => {
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
        }

      });
      console.log(this.form.value);
    }
  }
}
