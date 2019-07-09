import { Component, OnInit } from '@angular/core';
import { Isemaster } from '../isemaster';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-view-list-semastertotest',
  templateUrl: './view-list-semastertotest.component.html',
  styleUrls: ['./view-list-semastertotest.component.scss']
})
export class ViewListSemastertotestComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private myservice:MyserviceService, private semaster: FormBuilder, private fl: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
   });
   }
  semesterExams: Isemaster[] = [];
  displayedColumn: string[] = ['ID', 'SemesterName', 'StartDay', 'EndDay', 'Code', 'status'];
  dataSource = new MatTableDataSource<Isemaster>(this.semesterExams);
  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/semesterexam?candidateid=2&SemesterExamAssign').subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource);
      console.log(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });

  }
  ViewTest(ID  : string) { 

    


  }
}
