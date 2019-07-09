import { Component, OnInit,ChangeDetectionStrategy} from '@angular/core';
// import { Isemester } from '../isemaster';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormControlName } from '@angular/forms';
import { and } from '@angular/router/src/utils/collection';
import { Isemaster } from '../isemaster';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-semester-detail',
  templateUrl: './semester-detail.component.html',
  styleUrls: ['./semester-detail.component.scss']
})
export class SemesterDetailComponent implements OnInit {

  
  public dateTime: Date;
  public dateTime1: Date;
  list: Isemaster = {} as Isemaster;// a tiep
  CodeSource: string;
  generate : boolean;
  count: number = 0;
  formApply: FormGroup;
  Id = this.activatedRoute.snapshot.paramMap.get('Id');
  get SemesterName(): FormControl {
    return this.formApply.get('SemesterName') as FormControl
  }
  get StartDay(): FormControl {
    return this.formApply.get('StartDay') as FormControl
  }
  get EndDay(): FormControl {
    return this.formApply.get('EndDay') as FormControl
  }
  get Code(): FormControl {
    return this.formApply.get('Code') as FormControl
  }
  get status(): FormControl {
    return this.formApply.get('status') as FormControl
  }
 // get Creator(): FormControl {
 //   return this.formApply.get('Creator') as FormControl
 // }
  date1 = new FormControl(new Date(this.list.StartDay));
  date2 = new FormControl(new Date(this.list.EndDay));
  
  
  constructor(private myservice:MyserviceService, private semester: FormBuilder , private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  ngOnInit() {
    this.formApply = this.semester.group({
    
      SemesterName: ['', [Validators.required,Validators.minLength(4)]],
      StartDay: [''],
      EndDay: [''],
      status: [''],
    //  Creator:['']
      
      
      });
  
    this.http
      .get<string>('http://localhost:65170/semesterExam/detail/' + this.Id,{ headers: http() })
      .subscribe(
        value => {
          this.list = JSON.parse(value);
     
          console.log(this.list);

          
          this.formApply.patchValue(this.list);//a tiep
        }
      );
     
  }
  change(StartDay : string)
  {
    console.log(StartDay)
  }
  error: any = { isError: false, errorMessage: '' };
  compareTwoDates() {
    if (new Date(this.formApply.controls['EndDay'].value) < new Date(this.formApply.controls['StartDay'].value)) {
      this.error = { isError: true, errorMessage: 'End Date cant before start date !' };
    }
    else {
      this.error = { isError: false, errorMessage: '' };
    }
  }
  navigateToEdit() {
   
    console.log('code :'+this.list.Code)
   
    if(this.generate== true)
    {
      this.list.Code= this.CodeSource;
    }
    if(this.generate == false)
    {
      this.generate = true;
    }
    console.log(this.list)
    console.log(this.list.Code)
    console.log(this.formApply.value)
  
    //   const value = {
    //     ...this.list,
    //     ...this.formApply.value
    //   };
    
      const value = Object.assign({}, this.list, this.formApply.value,this.list.Code);// a tiep
      console.log('code:',this.Code)
      console.log('form apply :',value);
       console.log(value);  //this.list ko update dc gi ngoai code. value ko update dc code
      this.http.post('http://localhost:65170/semesterExam/Update', JSON.stringify(value), { headers: http() }).subscribe({
        next: (res) => {
          const listIdc = this.activatedRoute.snapshot.paramMap.get('listIdc');
          this.http.get<string>('http://localhost:65170/SemesterExam/detail/'+listIdc,{ headers: http() }).subscribe(value => {
            this.list = JSON.parse(value);
             console.log(this.list);
             console.log(this.list.Code);
          });
        },
        error: (err) => {
          console.log(err);
        }
        
      });
      if( confirm('Update SuccessFully'))
    {
      this.router.navigate(['/SemesterExamManager']);
      console.log(this.list.Code);
    }
    
    
    


  }
  
  GenerateCode()
  {

    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    var d = new Date();
    var curr_date = d.getDate();
    var curr_month = d.getMonth();
    var cuur_second = d.getMilliseconds();
    curr_month++;
    var curr_year = d.getFullYear();

    this.CodeSource= curr_date + curr_month + curr_year + cuur_second + result;
    this.list.Code=this.CodeSource;
    console.log(this.CodeSource)

  }
  

}
