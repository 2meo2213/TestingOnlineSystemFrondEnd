import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/exam';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface questions {
  QuesId: number;
  Content: string;
  Level: number;
  Suggestion: string;
  Type: number;
  Media: string;
  Status: number;
  CreatedBy: string;
  CreatedDate: Date;
  UpdatedBy: string;
  UpdatedDate: Date;
  CategoryName: string;
}




@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.scss']
})
export class ExamDetailComponent implements OnInit {
  // userForm: FormGroup;
  listfilter: {} = {};
  questions: questions[] = [];

  searchString: string;
  examID = this.ac.snapshot.paramMap.get('examID');
  numberQuestion: number;
  filterForm: FormGroup;
  randomForm: FormGroup;
  dataSource = new MatTableDataSource<questions>(this.questions);
  displayedColumns: string[] = ['select', 'Id', 'Category', 'Content', 'Level', 'Suggestion', 'Type', 'CreatedBy', 'CreatedDate'];
  selection = new SelectionModel<questions>(true, []);


  @ViewChild(MatSort) sort: MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router:Router,private myservice:MyserviceService,private http: HttpClient, private ac: ActivatedRoute, private fb: FormBuilder, private toar: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
     
   });
   }
  get StartDate(): FormControl {
    return this.filterForm.get('CreatedDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.filterForm.get('CreatedBy') as FormControl;
  }
  get Level(): FormControl {
    return this.filterForm.get('Level') as FormControl;
  }
  get Type(): FormControl {
    return this.filterForm.get('Type') as FormControl;
  }
  get Category(): FormControl {
    return this.filterForm.get('CategoryName') as FormControl;
  }
  get TypeQuestion(): FormControl {
    return this.randomForm.get('Type') as FormControl;
  }
  get QuestionCategory(): FormControl {
    return this.randomForm.get('CategoryName') as FormControl;
  }
  get RandomNumber(): FormControl {
    return this.randomForm.get('Total') as FormControl;
  }
 
  regTotal = "^[0-9]{1,4}$";
  ngOnInit() {
   
    this.filterForm = this.fb.group({
      // CreatedDate: [''],
      CategoryName: [''],
      Level: [''],
      CreatedBy: [''],
      Type: ['']

    });
    this.randomForm = this.fb.group({
      Type: ['', Validators.required],
      CategoryName: ['', Validators.required],
      Total: ['', [Validators.required, Validators.pattern]],
      ExamId: [this.examID]
    });
    this.listQuestion();

    this.http.get<string>('http://localhost:65170/api/ExamQuestions/1?action=getfillter',{ headers: http() }).subscribe(
      value => {
        this.listfilter = JSON.parse(value);
        this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;

      },
      err=>{
        
      
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
   

  }
  listQuestion() {
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID + '?action=GetAll',{ headers: http() }).subscribe(
      value => {
        this.dataSource.data = JSON.parse(value);
        (this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);


      },
      err=>{
        
      
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
this.selection.clear();
  }

  addQuestion(Id) {

  }
  AddMutiple() {
    let Arr = [];
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.selection.selected.forEach(item => {
      Arr.push({ ExamId: examID, QuestionId: item.QuesId });

    })
    if (Arr.length > 0) {
      this.http.post<string>('http://localhost:65170/api/ExamQuestions/?action=AddMutiple', JSON.stringify(Arr),{ headers: http() }).subscribe((error) => {
        if (error >0) {
          var  errors=error/2;
          this.toar.success('inserted' + ' ' + errors + ' ' + 'records in Exam', ' Question Number');
          // this.toar.warning('something went wrong', ' Question Number');
        } else if (error == 0) {

          this.toar.info('There are no questions in this category match with exam', ' Question Number');
        } else {
          var errorss=201+','+JSON.parse(error.toString()).Message;
          this.myservice.changeError(errorss);
        }
        
        this.listQuestion();



      },
      err=>{
        
        
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
    } else {
      this.toar.info('please choice question', ' Question Number');
    }

  }

  random() {


  }
  onSubmit() {


    if (this.randomForm.valid) {
    
      const value = this.randomForm.value;
      this.http.post<string>('http://localhost:65170/api/ExamQuestions?action=random', JSON.stringify(value),{ headers: http() }).subscribe((error) => {
        if (error == 0) {
          this.toar.info('There are no questions in this category', ' Question Number');
        } else if (error>0) {
          var  errors=error/2;
          this.toar.success('inserted' + ' ' + errors + ' ' + 'records in Exam', ' Question Number');
          
        } else {
          var errorss=201+','+JSON.parse(error.toString()).Message;
          this.myservice.changeError(errorss);
        }

        // confirm('inserted' + ' ' + error + ' ' + 'records in Exam');
        this.listQuestion();

        console.log(error)
      },
      err=>{
        
       
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
      console.log(this.randomForm.value);
    }
  }
  validateForm() {
    if (this.randomForm.invalid) {
      this.randomForm.get('Type').markAsTouched();
      this.randomForm.get('CategoryName').markAsTouched();
      this.randomForm.get('Total').markAsTouched();

      return;
    }
  }

  onSearch() {
    this.http.get<string>('http://localhost:65170/api/ExamQuestions?searchString=' + this.searchString,{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    }, err=>{
        
      
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  });
  }
  onFilter() {
    const value = this.filterForm.value;
    console.log(value);
    this.http.post<string>('http://localhost:65170/api/ExamQuestions', JSON.stringify(value),{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;

    }, err=>{
        
      
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: questions): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.QuesId + 1}`;
  }






}
