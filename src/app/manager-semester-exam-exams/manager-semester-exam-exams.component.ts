import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Exam } from '../exam';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BrowserModule } from '@angular/platform-browser';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-manager-semester-exam-exams',
  templateUrl: './manager-semester-exam-exams.component.html',
  styleUrls: ['./manager-semester-exam-exams.component.scss']
})
export class ManagerSemesterExamExamsComponent implements OnInit {


  ListExams: Exam[] = [];
  ListAllExams: Exam[] = [];
  listAdd: number[] = [];
  a: any;
  check: number = 0;
  Id = this.activateRoute.snapshot.paramMap.get('Id');
  searchString: string = "";

  displayedColumn: string[] = ['select', 'Id', 'NameExam', 'CreateBy', 'QuestionNumber', 'Status']
  dataSource = new MatTableDataSource<Exam>(this.ListExams);
  dataSource2 = new MatTableDataSource<Exam>(this.ListAllExams);
  constructor(private http: HttpClient, private router: Router,private myservice:MyserviceService, private activateRoute: ActivatedRoute) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }


  selection = new SelectionModel<Exam>(true, []);
  onSearch() {

    console.log('http://localhost:65170/api/SemesterExam/?searchString=' + this.searchString + '&id=' + this.Id + '&searchExams')
    this.http.get<string>('http://localhost:65170/api/SemesterExam/?searchString=' + this.searchString + '&id=' + this.Id + '&searchExams').subscribe(
      value => {
        console.log(this.searchString);
        this.dataSource.data = JSON.parse(value);
        console.log(value);
      });
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

  checkboxLabel(row?: Exam): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Id + 1}`;
  }

  get(row?: Exam) {

    for (this.a in this.listAdd) {
      if (this.a == row.Id) {
        this.check = 0;

      }
    }
    if (this.check = 1) { this.listAdd.push(row.Id); }

    console.log(this.listAdd);

  }
  add() {
    console.log(this.listAdd);
    this.http.post('http://localhost:65170/api/SemesterExam/1', this.listAdd, httpOptions).subscribe(data => console.log(data));


  }
  ngOnInit() {

    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Id + '?IsGetExams').subscribe(value => {

      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource);

    });
  }
  AddExam() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Id + '?IsgetExamsnotadd').subscribe(value => {

      this.dataSource2.data = JSON.parse(value);
      console.log(this.dataSource2);
    });
  }



}
