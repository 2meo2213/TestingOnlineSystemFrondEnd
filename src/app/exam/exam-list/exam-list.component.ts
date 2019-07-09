import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exam } from 'src/app/exam';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
@Component({
  selector: 'app-exam-list',
  templateUrl: './exam-list.component.html',
  styleUrls: ['./exam-list.component.scss']
})
export class ExamListComponent implements OnInit {
  filterExam: FormGroup;
  listExam: {} = {};
  exams: Exam[] = [];

  searchString: string;
  filter: [];
  examInfo: Exam []=[];
  displayedColumn: string[] = ['select', 'NameExam', 'CreateBy', 'QuestionNumber', 'SpaceQuestionNumber', 'NameCategory', 'Status', 'CreateAt', 'Note', 'Action'];
  dataSource = new MatTableDataSource<Exam>(this.exams);
  selection = new SelectionModel<Exam>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private myservice:MyserviceService,private http: HttpClient, private router: Router, private toasr: ToastrService, private fb: FormBuilder) {

    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
     }






  onSubmit() {
    {
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
      if (this.filterExam.valid) {
        const value = this.filterExam.value;
        this.http.post<string>('http://localhost:65170/api/Exam?action=filter', JSON.stringify(value), { headers: http() }).subscribe({
          next: (res) => {


            this.dataSource.data = JSON.parse(res);
          },
          error: (err) => {

            console.log('false');
            var errors=err.status+','+err.message;
            this.myservice.changeError(errors);
          }

        });
      }
    }
  }


  listexams() {
    this.http.get<string>('http://localhost:65170/api/Exam',{ headers: http() }).subscribe(
      value => {
        this.exams = JSON.parse(value);
        for (let i = 0; i < this.exams.length; i++) {
          if(this.exams[i].Category != null){
            // console.log(this.exams[i].Category);
            this.exams[i].NameCategory = this.exams[i].Category.Name;
          }
        }
        this.dataSource.data = this.exams;
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

      },
      err=>{
        
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
      }
      );
  }
  updateQuestion(id){
    this.router.navigate(['/exam/examquestion',id])
   setInterval(() => {
    location.reload()
    }, 10);
    
  }
 
  
  
  ngOnInit() {
    this.http.post<string>('http://localhost:65170/api/Exam?action=getfilter', {},{ headers: http() }).subscribe(
      value => {
        this.listExam = JSON.parse(value);
      },
      err=>{
        
       
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
    this.filterExam = this.fb.group({
      Timetest: ['',],
      CreateBy: ['',],
      QuestionNumber: ['',],
      Status: '',
      CreateAt: ['',],
      TypeExam: ['']
    });
    this.listexams();
    this.dataSource.sort = this.sort;
    // this.myservice.changeMessage('2');
   
  }
  
  detail(examID) {
    this.http.get<string>('http://localhost:65170/api/Exam/' + examID,{ headers: http() }).subscribe
      (
        value => {
          this.examInfo = JSON.parse(value).Data;
          console.log(this.examInfo);
        },
        err=>{
        
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
         
        
       
      }
      );
  }
  detailQuestion(examID) {

    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID,{ headers: http() }).subscribe
      (
        value => {
          this.examInfo = JSON.parse(value);

        },
        err=>{
        
        
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
         
        
       
      }
      );
  }
  onFilter() {
    const value = this.filterExam.value;
    this.http.post<string>('http://localhost:65170/api/Exam/?action=filter', JSON.stringify(value),{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    },
    err=>{
        
      
      var errors=err.status+','+err.message;
      this.myservice.changeError(errors);
     
    
   
  });

    // const value = this.filterExam.value;
    // this.http.post<string>('http://localhost:65170/api/Exam?action=getfilter', JSON.stringify(value)).subscribe(value => {
    //   this.dataSource.data = JSON.parse(value);
    // });
  }
  onSearch() {
    this.http.get<string>('http://localhost:65170/api/Exam?searchString=' + this.searchString,{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    },
    err=>{
        
     
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
  navigateToEdit(examID: string) {
    this.router.navigate(['/exam', 'update', examID,]);
  }


  exportExam(examID: number) {
    if (confirm('you want to export record')) {
      this.http.get<string>('http://localhost:65170/api/Exam/' + examID + '?action=export',{ headers: http() }).subscribe
        (
          res => {
            this.listexams();
            this.toasr.warning('Export Successfully', 'Exam.Export');

          },
          err=>{
        
           
            var errors=err.status+','+err.message;
            this.myservice.changeError(errors);
           
          
         
        });
    }
  }

  deleteExam(examID: number) {
    if (confirm('you want to delete record')) {
      this.http.delete('http://localhost:65170/api/Exam/' + examID,{ headers: http() }).subscribe
        (
          res => {
            if (res == 1) {
              this.exams = this.exams.filter(ex => ex.Id !== examID);
              this.toasr.success('Delete Successfully', 'Exam Delete');
            }
            else if (res == false) {
              this.toasr.error('Delete Fail because exam has been public', 'Exam Delete');
            }
            this.listexams();
           

          },
          err=>{
        
           
            var errors=err.status+','+err.message;
            this.myservice.changeError(errors);
           
          
         
        });
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Exam): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.NameExam + 1}`;
  }


}
