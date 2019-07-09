import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
export interface detailExam {
  QuesId: number;
  nameExam: string;
  Content: string;
  Level: number;
  Suggestion: string;
  Type: number;
  Status: number;
  CreatedBy: string;
  CreatedDate: Date;
  CategoryName: string;
  Space: string;
}
@Component({
  selector: 'app-exam-detail-question',
  templateUrl: './exam-detail-question.component.html',
  styleUrls: ['./exam-detail-question.component.scss']
})
export class ExamDetailQuestionComponent implements OnInit {

  // userForm: FormGroup;
  listfilter: {} = {};
  detailExams: detailExam[] = [];
  searchString: string;
  examID = this.ac.snapshot.paramMap.get('examID');
  dataSource = new MatTableDataSource<detailExam>(this.detailExams);
checked=false
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['select', 'QuesId', 'Category', 'nameExam', 'Content', 'Level', 'Space', 'CreatedBy', 'CreatedDate'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  selection = new SelectionModel<detailExam>(true, []);
  constructor(private myservice:MyserviceService,private router:Router,private http: HttpClient, private ac: ActivatedRoute, private fb: FormBuilder, private toar: ToastrService) { 
    this.router.events.subscribe((event) => {
      
      this.myservice.changeMessage('1');
      
   });
  }

  ngOnInit() {
   
    this.listQuestionDetail();
  }
  listQuestionDetail() {

    const examID = this.ac.snapshot.paramMap.get('examID');
    this.http.get<string>('http://localhost:65170/api/ExamQuestions/' + examID + '?action=GetById',{ headers: http() }).subscribe(
      value => {
        this.dataSource.data = JSON.parse(value);

        (this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

      }, err=>{
        
       
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    });
      this.selection.clear();
  }

  DeleteMutiple() {
    let Arr = [];
    const examID = this.ac.snapshot.paramMap.get('examID');
    this.selection.selected.forEach(item => {
      Arr.push({ ExamId: examID, QuestionId: item.QuesId });
    })

    if (Arr.length != 0) {
      this.http.post<string>('http://localhost:65170/api/ExamQuestions?action=DeleteMutiple', JSON.stringify(Arr),{ headers: http() }).subscribe(value => {
        if (value == -1) {
          this.toar.warning('Exam is public,cannot delete', ' Question Number');
        } else if (value == 0) {

          this.toar.info('There are no questions found in this exam', ' Question Number');

        } else if (value >0) {
          var  values=value/2;
          this.toar.success('deleted' + ' ' + values + ' ' + 'records in Exam', ' Question Number');
          // this.toar.warning('something went wrong', ' Question Number');
        }
        else {
         
          var errorss=201+','+JSON.parse(value.toString()).Message;
          this.myservice.changeError(errorss);
        }
        
        this.listQuestionDetail();

      }, err=>{
        
       
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      
     
    })
    }else{
      this.toar.info('please choice question', ' Question Number');
    }


  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  checkboxLabel(row?: detailExam): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nameExam + 1}`;
  }





}
