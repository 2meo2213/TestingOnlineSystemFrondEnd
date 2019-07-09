import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
export interface Exam {
  id: number;
  NameExam: string;
  CreateBy: string;
  QuestionNumber: number;
  Status: boolean;
  TypeExam: string;
  CreateAt: Date;
  Note: string;
}

export interface Test {
  Id: number;
  TestName: string;
  NameExam: string;
  Status: string;
  PassScore: number;
  SemesterName: string;
  ExamId: number;
  SemasterExamId: number;
  StartDate: Date;
  EndDate: Date;
}


@Component({
  selector: 'app-list-test',
  templateUrl: './list-test.component.html',
  styleUrls: ['./list-test.component.scss']
})
export class ListTestComponent implements OnInit {

  tests: Test[] = [];
  // isCheckALL = false;
  // disabled = true;
  // listId: number[] = [];
  searchString: string;
  examInfo: Test;

  displayedColumn: string[] = ['select', 'TestName', 'NameExam', 'CreateBy', 'PassScore', 'SemesterName', 'Status', 'Action'];
  dataSource = new MatTableDataSource<Test>(this.tests);
  selection = new SelectionModel<Test>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private myservice:MyserviceService, private http: HttpClient, private router: Router, private fb: FormBuilder) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  deleteTest(Id: number) {
    if (confirm('you want to delete record')) {
      this.http.delete('http://localhost:65170/api/test/' + Id,{ headers: http() }).subscribe
        (
          res => {
            if (res == true) {
              this.tests = this.tests.filter(ex => ex.Id !== Id);
            }
            else if (res == false) {
              confirm("Is Public not Delete");
            }
            this.http.get<string>('http://localhost:65170/api/Test',{ headers: http() }).subscribe(
              value => {
                this.dataSource.data = JSON.parse(value);
                console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

              },
              err=>{
        
                
                var errors=err.status+','+err.message;
                this.myservice.changeError(errors);
               
              
             
            }
              );

          },
          err=>{
        
           
            var errors=err.status+','+err.message;
            this.myservice.changeError(errors);
           
          
         
        }
          );
    }
  }
  ngOnInit() {
    
    this.http.get<string>('http://localhost:65170/api/Test',{ headers: http() }).subscribe(
      value => {
        
        this.dataSource.data = JSON.parse(value);
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);

      },
      
      err=>{
        
          
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
         
        
       
      });
      this.dataSource.sort = this.sort;
  }
  detail(testID) {

    this.http.get<string>('http://localhost:65170/api/test/' + testID,{ headers: http() }).subscribe
      (
        value => {
         
          this.tests=JSON.parse(value);
          //console.log(this.examInfo);

        },
        err=>{
        
          
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
         
        
       
      }
      );
  }
  navigateToEdit(Id: string) {
    this.router.navigate(['/test', 'update', Id,]);
  }
  onSearch() {
    this.http.get<string>('http://localhost:65170/api/Test?searchString=' + this.searchString,{ headers: http() }).subscribe(value => {
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
  checkboxLabel(row?: Test): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.TestName + 1}`;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }


}
