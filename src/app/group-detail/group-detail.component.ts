import { Component, OnInit, ViewChild } from '@angular/core';
import { Group } from '../group';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupUser } from '../group-user';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {
  searchString: string;
  groups: Group = undefined;
  usergroups: GroupUser[] = [];
  PositionApi: [];
  DepartmentApi: [];

  constructor(private activatedRoute: ActivatedRoute,private router: Router, private http: HttpClient,private myservice:MyserviceService, private fb: FormBuilder) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }
  displayedColumn: string[] = ['UserId', 'UserName', 'FullName', 'Email', 'Department', 'Position'];
  dataSource = new MatTableDataSource<GroupUser>(this.usergroups);
  selection = new SelectionModel<GroupUser>(true, []);

  filterForm: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  get Position(): FormControl {
    return this.filterForm.get('Position') as FormControl;
  }
  get Department(): FormControl {
    return this.filterForm.get('Department') as FormControl;
  }

  ngOnInit() {
    const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.http.get<string>('http://localhost:65170/api/Group/' + GroupId, { headers: http() }).subscribe(value => {
      this.groups = JSON.parse(value).Data;
      console.log(this.groups);
    });
    this.http.get<string>('http://localhost:65170/api/UserGroup/' + GroupId, { headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
    this.filterForm = this.fb.group({
      Position: [''],
      Department: ['']
    });
    this.http.get<string>('http://localhost:65170/api/UserGroup/' + GroupId, { headers: http() }).subscribe(value => {
      this.PositionApi = JSON.parse(value).Data;
    });
    this.http.get<string>('http://localhost:65170/api/UserGroup/' + GroupId, { headers: http() }).subscribe(value => {
      this.DepartmentApi = JSON.parse(value).Data;
    });
  }

  onSearch() {
    const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.http.get<string>('http://localhost:65170/api/UserGroup/?id=' + GroupId
      + '&searchString=' + this.searchString, { headers: http() }).subscribe(value => {
        this.dataSource.data = JSON.parse(value).Data;
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      });
  }

  onFilter() {
    const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    const value = this.filterForm.value;
    console.log(value);
    this.http.post<string>('http://localhost:65170/api/UserGroup/?action=filter&id=' + GroupId, JSON.stringify(value),
    { headers: http() }).subscribe(value => {
        this.dataSource.data = JSON.parse(value).Data;
      });
  }
}
