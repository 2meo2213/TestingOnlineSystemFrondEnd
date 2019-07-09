import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { User } from 'src/app/user';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-create-exam',
  templateUrl: './create-exam.component.html',
  styleUrls: ['./create-exam.component.scss']
})
export class CreateExamComponent implements OnInit {
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  name:string;
  public Editor = ClassicEditorBuild;

  
  // submited = false;
  // disabled = false;
  examForm: FormGroup;
  number = "^([1-9][0-9]{0,3}|^2000)$";
   regex = '^([A-Za-z0-9# ]{0,100})$';
  
  CategoryFormApi = [];
  constructor(private myservice:MyserviceService,private fb: FormBuilder,private toar:ToastrService, private http: HttpClient, private authenticationService: AuthenticationService
    ,private router:Router ) {
      this.router.events.subscribe((event) => {
        this.myservice.changeMessage('1');
     });
   }
  get NameExam(): FormControl {
    return this.examForm.get('NameExam') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.examForm.get('CreateBy') as FormControl;
  }
  get QuestionNumber(): FormControl {
    return this.examForm.get('QuestionNumber') as FormControl;
  }

  get SpaceQuestionNumber(): FormControl {
    return this.examForm.get('SpaceQuestionNumber') as FormControl;
  }
  get CreateAt(): FormControl {
    return this.examForm.get('CreateAt') as FormControl;
  }
  get CategoryId(): FormGroup {
    return this.examForm.get('CategoryId') as FormGroup;
  }
  get Categorys(): FormGroup {
    return this.examForm.get('Categorys') as FormGroup;
  }
  get Note(): FormControl {
    return this.examForm.get('Note') as FormControl;
  }

  ngOnInit() {
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
     
     
    } else {
      this.Users = null;
    }
    console.log(''+this.UserName);
    this.getApiCategory();
    this.examForm = this.fb.group({
      NameExam: ['', [Validators.required, Validators.maxLength(50), Validators.pattern]],
      CreateBy: [this.UserName],
      QuestionNumber: ['', [Validators.required, Validators.pattern]],
      //status: ['', [{value: 'false', disabled: true}]],
     
      SpaceQuestionNumber: [100, [Validators.required, Validators.pattern]],
      CreateAt: [''],
        CategoryId: [''],
      Note: [''],



    });
    
  }
  getApiCategory() {
    this.http.get<string>('http://localhost:65170/api/Category/',{ headers: http() }).subscribe(value => {
      this.CategoryFormApi = JSON.parse(value);
    },
    err=>{
        
      
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  }
    );
  }
  validateForm() {
    if (this.examForm.invalid) {
      this.examForm.get('NameExam').markAsTouched();
      this.examForm.get('CreateBy').markAsTouched();
      this.examForm.get('QuestionNumber').markAsTouched();
      this.examForm.get('SpaceQuestionNumber').markAsTouched();
      // this.examForm.get('CategoryId').markAsTouched();

      return;
    }
    // do something else
  }
  onSubmit() {
    
    console.log(this.examForm.value);
    if (this.examForm.valid) {
      console.log(this.examForm.value);
      const value = this.examForm.value;
      value.Category = this.CategoryFormApi.filter(s => s.Id == value.CategoryId);
      value.Category = value.Category.length > 0 ? value.Category[0] : null;
     
      this.http.post<string>('http://localhost:65170/api/Exam', JSON.stringify(value),{ headers: http() }).subscribe({
        next: (response) => {
          
       
          if(response==2){
            this.toar.success('Successful',' Create exam');
           
          }else if(response==-2){
            this.toar.warning('exam is exist',' Create exam');
          }
          
          else{
            var errors=201+','+JSON.parse(response.toString()).Message;
          this.myservice.changeError(errors);
          }
         console.log(response)
        },

        error: (err) => {
         // this.toar.warning('Fail',' Create exam');
          //this.examForm.reset();
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
        }
        
      }
     
      
      );
      console.log(this.examForm.value);
    }
    //this.route.navigate(['/exam'])
  }





}
