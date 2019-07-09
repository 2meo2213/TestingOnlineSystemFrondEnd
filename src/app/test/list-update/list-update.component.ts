import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
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
export class test {
  Id: number;
  ExamId: number;
  SemasterExamId: number;
  Status: number;
  CreateBy: string;
  PassScore: number;
  TestName: string;
  TotalTest: number;
  TestTime:number;
}
export class semaster {
  ID: number;
  SemesterName: string
}
@Component({
  selector: 'app-list-update',
  templateUrl: './list-update.component.html',
  styleUrls: ['./list-update.component.scss']
})
export class ListUpdateComponent implements OnInit {
  tests:test[]=[];
  exams: exam[] = [];
  form: FormGroup;
  semasters: semaster[] = [];
  
  constructor(private myservice:MyserviceService, private router: Router, private insert: FormBuilder, private http: HttpClient, private ac: ActivatedRoute,private toar:ToastrService) {
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
  timeTestFormat = "^[0-9]{1,3}$";
  passScoreFormat="^[1-9][0-9]{0,4}$";
  passTotalFormat="^[1-9][0-9]{0,4}$";
  ngOnInit() {
    this.form = this.insert.group({
      ExamId: ['', [Validators.required]],
      SemasterExamId: [''],
      TestName: ['', [Validators.required]],
      // StartDate: ['', ],
      // EndDate: ['', ],
      CreateBy: ['', [Validators.required]],

      PassScore: ['', [Validators.required, Validators.pattern]],
      TotalTest: ['', [Validators.required, Validators.pattern]],
      Status: ['', [Validators.required]],
      TestTime: ['', [Validators.required,Validators.pattern]],

    });
 
    this.http.get<string>('http://localhost:65170/api/exam', { headers: http() }).subscribe(
      value => {
        this.exams = JSON.parse(value);

      }, err=>{
        
      
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
   
    this.http.get<string>('http://localhost:65170/api/Semaster', { headers: http() }).subscribe(
      value => {
        this.semasters = JSON.parse(value);

      }, err=>{
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
        });
    const TestID = this.ac.snapshot.paramMap.get('Id');
   
    this.http.get<string>('http://localhost:65170/api/test/'+TestID+ '?action=DetailUpdate' , { headers: http() }).subscribe(value => {
      this.tests = JSON.parse(value);
     
      this.form.patchValue(JSON.parse(value));
      console.log(JSON.parse(value) );
    }, err=>{
      var errors=err.status+','+err.message;
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
      const formData = {
        ...this.tests,
        ...value
      };
      this.http.put
  
        ('http://localhost:65170/api/Test/' + formData.Id, formData, { headers: http() })
        .subscribe({
        
          next: (response) => {
              this.toar.success('Successful',' Update Test');
          
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
