import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { GroupUser } from '../group-user';
import { ResultObject } from '../result-object';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
import { ToastrService } from 'ngx-toastr';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-user-group',
  templateUrl: './user-group.component.html',
  styleUrls: ['./user-group.component.scss']
})
export class UserGroupComponent implements OnInit {
  usergroups: GroupUser[] = [];
  usergroup: GroupUser = undefined;
  userId = '';
  check: string;
  ObjFormGroup: FormGroup;
  get GroupName(): FormControl {
    return this.ObjFormGroup.get('GroupName') as FormControl;
  }
  constructor(private toar: ToastrService, private myservice: MyserviceService, private fb: FormBuilder, private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
    });
  }
  displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName', 'Action'];
  dataSource = new MatTableDataSource<GroupUser>(this.usergroups);
  selection = new SelectionModel<GroupUser>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.ObjFormGroup = this.fb.group({
      GroupName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]
    });

    const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');


    this.http.get<string>('http://localhost:65170/api/Group/' + GroupId, { headers: http() }).subscribe(value => {
      this.usergroup = JSON.parse(value).Data;
      console.log(this.usergroup);
    });

    this.http.get<string>('http://localhost:65170/api/UserGroup/' + GroupId, { headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
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
  checkboxLabel(row?: GroupUser): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.FullName + 1}`;
  }

  listUserGroup() {
    const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.http.get<string>('http://localhost:65170/api/UserGroup/' + GroupId, { headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  getId(id) {
    this.userId = id;
  }
  DeleteUserGroup(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
      const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
      this.http.delete<string>('http://localhost:65170/api/UserGroup/?idgroup=' + GroupId + '&iduser=' + userId, { headers: http() }).subscribe((res) => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.usergroups = this.usergroups.filter(b => b.UserId !== this.userId);
          this.toar.success('Delete success !', '');
          this.listUserGroup();
        } else {
          this.toar.error('Delete Fail !', '');
        }

      });
    }
  }

  removeSelectedRows() {
    if (confirm('Are you sure you want to delete this user?')) {
      this.selection.selected.forEach(item => {
        const UserGroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
        this.http.delete<string>('http://localhost:65170/api/UserGroup/?idgroup=' + UserGroupId + '&iduser=' + item.UserId, { headers: http() }).subscribe(res => {
          let result = JSON.parse(res);
          if (result.Success == 1) {
            this.usergroups = this.usergroups.filter(b => b.UserId !== item.UserId);
            this.listUserGroup();
          } else {
          }
        });
      });
      this.selection = new SelectionModel<GroupUser>(true, []);
    }
  }

  clickToRoute() {
    const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
    this.router.navigate(['group/usergroup/usergroupadd/', GroupId]);
  }
  clickToGoBack() {
    this.router.navigate(['group/']);
  }
  submitEdit(groupName) {
    if (confirm('Are you sure you want to save this group name?')) {
      const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
      this.http.get<string>('http://localhost:65170/api/Group/?groupName=' + groupName + '&groupId=' + GroupId,
        { headers: http() }).subscribe(res => {
          this.check = res;
          console.log(this.check);
          if (this.check == 'False') {
            // console.log(groupName);

            // console.log(GroupId);
            this.http.put<string>('http://localhost:65170/api/Group/?id=' + GroupId + '&groupname=' + groupName, { headers: http() }).subscribe({
              next: (res) => {
                const result: ResultObject = JSON.parse(res);
                if (result.Success >= 1) {
                  confirm('Update success!');
                } else {
                  confirm('Update Fail!');
                }
              },
              error: (err) => {
                console.log(err);
              }
            });
          }
          else {
            confirm("Group name is exist");
          }
        });


    }
  }

}


