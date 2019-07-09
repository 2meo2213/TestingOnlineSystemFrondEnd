import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserGroupAdd } from '../user-group-add';
import { MyserviceService } from '../myservice.service';
import { http } from '../http-header';
import { ResultObject } from '../result-object';
import { ToastrService } from 'ngx-toastr';


const httpOptions = {
  headers: new HttpHeaders().append('Content-Type', 'application/json')
};


@Component({
  selector: 'app-user-group-add',
  templateUrl: './user-group-add.component.html',
  styleUrls: ['./user-group-add.component.scss']
})
export class UserGroupAddComponent implements OnInit {
  addusergroups: UserGroupAdd[] = [];
  toastr: any;
   arr=[];
  constructor(private toar:ToastrService
    ,private myservice: MyserviceService, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }
  displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName'];
  dataSource = new MatTableDataSource<UserGroupAdd>(this.addusergroups);
  selection = new SelectionModel<UserGroupAdd>(true, []);
  userId = '';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    console.log(UserGroupId);
    this.http.get<string>('http://localhost:65170/api/UserGroup/?idgroup=' + UserGroupId, { headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.addusergroups);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
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
  checkboxLabel(row?: UserGroupAdd): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.FullName + 1}`;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  AddSelectedRows() {
    if (confirm('Are you sure you to add this User?')) {
      this.selection.selected.forEach(item => {
        const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
        this.userId = this.activatedRoute.snapshot.paramMap.get('UserId');
        console.log(item.UserId);
        console.log(UserGroupId);
        // var arr = { UserId: item.UserId, GroupId: UserGroupId };
        this.arr.push({ UserId: item.UserId, GroupId: UserGroupId });
        console.log(this.arr)
        this.dataSource = new MatTableDataSource<UserGroupAdd>(this.dataSource.data);
      });
      const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
      this.http.post<string>('http://localhost:65170/api/UserGroup', JSON.stringify(this.arr), { headers: http() }).subscribe(
        value => {
          const result: ResultObject = JSON.parse(value);
          if (result.Success >= 1) {
           
          this.dataSource.data = JSON.parse(value).Data;
          this.http.get<string>('http://localhost:65170/api/UserGroup/?idgroup=' + UserGroupId, { headers: http() }).subscribe(value => {
            this.dataSource.data = JSON.parse(value).Data;
             
            console.log(this.addusergroups);
          });
          this.toar.success('Add success !', '');
        }
        else{
          this.toar.error('Add Fail !', '');
        }
      }
      );
      this.selection = new SelectionModel<UserGroupAdd>(true, []);
    }
  }
  clickToRoute() {
    const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.router.navigate(['group/usergroup/' + UserGroupId]);
  }

}
