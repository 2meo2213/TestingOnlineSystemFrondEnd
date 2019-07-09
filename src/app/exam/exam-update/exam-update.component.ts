import { Component, OnInit } from '@angular/core';
import { Form, NgForm, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Exam } from 'src/app/exam';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-exam-update',
  templateUrl: './exam-update.component.html',
  styleUrls: ['./exam-update.component.scss']
})
export class ExamUpdateComponent implements OnInit {

  public Editor = ClassicEditorBuild;
  // submited = false;
  // disabled = false;
  exam: Exam[] = [];

  editForm: FormGroup;
  number = "^([1-9][0-9]{0,3}|^2000)$";
  //regex = "^[A-Za-z0-9\s _]+$";
  CategoryFormApi = [];
  categoryname: {};


  constructor(private myservice:MyserviceService,private fb: FormBuilder, private toar: ToastrService, private http: HttpClient, private ac: ActivatedRoute,
    private router: Router) {
      this.router.events.subscribe((event) => {
        this.myservice.changeMessage('1');
     });
     }
  get NameExam(): FormControl {
    return this.editForm.get('NameExam') as FormControl;
  }
  get CreateBy(): FormControl {
    return this.editForm.get('CreateBy') as FormControl;
  }
  get QuestionNumber(): FormControl {
    return this.editForm.get('QuestionNumber') as FormControl;
  }
  get Status(): FormControl {
    return this.editForm.get('Status') as FormControl;
  }
  get SpaceQuestionNumber(): FormControl {
    return this.editForm.get('SpaceQuestionNumber') as FormControl;
  }
  get CreateAt(): FormControl {
    return this.editForm.get('CreateAt') as FormControl;
  }
  get CategoryId(): FormControl {
    return this.editForm.get('CategoryId') as FormControl;
  }
  get Categorys(): FormGroup {
    return this.editForm.get('Categorys') as FormGroup;
  }
  get Note(): FormControl {
    return this.editForm.get('Note') as FormControl;
  }
  getApiCategory() {
    this.http.get<string>('http://localhost:65170/api/Category/', { headers: http() }).subscribe(value => {
      this.CategoryFormApi = JSON.parse(value);
      console.log(this.CategoryFormApi);
    },
    err=>{
        
      // this.router.navigate(['group']);
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  });
  }

  ngOnInit() {
    this.getApiCategory();
    this.editForm = this.fb.group({
      NameExam: ['', [Validators.required, Validators.maxLength(50)]],
      CreateBy: ['', [Validators.required]],
      QuestionNumber: ['', [Validators.required, Validators.pattern]],
      //status: ['', [{value: 'false', disabled: true}]],
      Status: [''],
      SpaceQuestionNumber: ['', [Validators.required, Validators.pattern]],
      CreateAt: [''],
      Note: [''],
      CategoryId: [''],
    });

    const examID = this.ac.snapshot.paramMap.get('Id');
    this.http.get<string>('http://localhost:65170/api/Exam/' + examID, { headers: http() }).subscribe(value => {
      this.categoryname = value;
      console.log(value);
    },
    err=>{
        
      // this.router.navigate(['group']);
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  });
    this.http.get<string>('http://localhost:65170/api/Exam/' + examID, { headers: http() }).subscribe(value => {
      this.exam = JSON.parse(value).Data[0];

      // if(this.exam.Category){
      //   this.exam.CategoryId= this.exam.Category.Id;
      // }
      this.editForm.patchValue(this.exam);


    },
    err=>{
        
      // this.router.navigate(['group']);
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  });
  }

  validateForm() {
    if (this.editForm.invalid) {
      this.editForm.get('NameExam').markAsTouched();
      this.editForm.get('CreateBy').markAsTouched();
      this.editForm.get('QuestionNumber').markAsTouched();
      this.editForm.get('SpaceQuestionNumber').markAsTouched();
      //this.editForm.get('CategoryId').markAsTouched();
      return;

    }

  }
  onSubmit() {
    const value = this.editForm.value;
    

    // let temp=this.CategoryFormApi.filter(s => s.CategoryId == value.CategoryId);
    let temp = this.CategoryFormApi.filter(s => s.Id == value.CategoryId);
    
    //value.Category = this.CategoryFormApi.filter(s => s.Id == value.CategoryId);
    value.Category = temp.length > 0 ? temp[0] : null;
    
    if (this.editForm.valid) {
      const formData = {
        ...this.exam,
        ...value
      };
      this.http.put('http://localhost:65170/api/Exam/' + formData.Id, formData, { headers: http() }).subscribe({
        next: (res) => {
         
         if(res==1){
          this.toar.success('Update Success','Update Exam');
          console.log(res);
         }else if(res==0){
           this.toar.warning('exam is public','Update Exam')
         }
         
         else{
          var errors=201+','+JSON.parse(res.toString()).Message;
          this.myservice.changeError(errors);
          //  this.toar.warning(JSON.parse(res.toString()).Message,'Update')
         }
      // console.log(JSON.parse(res.toString()).Message.substring(0,10))
      //    console.log(JSON.parse(res.toString()) )
        },
        
        error: (err) => {
         
          var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
        }
      });
     
    }
    // this.router.navigate(['/exam'])
  }





}
