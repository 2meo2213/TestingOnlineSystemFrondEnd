import { Component, OnInit, ViewChild } from '@angular/core';
import { Test } from '../list-test/list-test.component';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss']
})


export class ListDetailComponent implements OnInit {
  test: Test[] = [];
  displayedColumn: string[] = ['select', 'NameUser', 'TotalTest', 'Score'];
  dataSource = new MatTableDataSource<Test>(this.test);
  selection = new SelectionModel<Test>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private myservice:MyserviceService, private router: Router, private ac: ActivatedRoute, private http: HttpClient) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  testName:string;
  ngOnInit() {
    this.testName=this.ac.snapshot.paramMap.get('TestName');
    console.log(this.testName);
    const testID = this.ac.snapshot.paramMap.get('testID');
    const userid=1;
    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];
    } else {
      this.Users = null;
    }
    this.http.get<string>('http://localhost:65170/api/test/'+testID+'?action=detail&&userid='+this.UserId, { headers: http() }).subscribe
      (
        value => {
         
            this.dataSource.data = JSON.parse(value);
            console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
            console.log('value' + value);
         
          
        }        
        ,err=>{
          // this.router.navigate(['group']);
          var errors=err.status+','+err.message;
          this.myservice.changeError(errors);
      }
      );
  
    this.dataSource.sort = this.sort;
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
