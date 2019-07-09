import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { RoleComponent } from '../role/role.component';
import { ResultObject } from '../result-object';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Roleaction } from '../roleaction';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-roleaction',
  templateUrl: './roleaction.component.html',
  styleUrls: ['./roleaction.component.scss']
})
export class RoleActionComponent implements OnInit {
  roleactions: Roleaction[] = [];
  roleaction: Roleaction = undefined;
  actionId = '';
  check: string;
  ObjFormGroup: FormGroup;
  roleId: string;
  get RoleName(): FormControl {
    return this.ObjFormGroup.get('RoleName') as FormControl;
  }
  constructor(private fb: FormBuilder, private http: HttpClient,private myservice:MyserviceService, private router: Router, private activatedRoute: ActivatedRoute,private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }
  displayedColumn: string[] = [ 'ActionName', 'Description', 'Action'];
  dataSource = new MatTableDataSource<Roleaction>(this.roleactions);
  selection = new SelectionModel<Roleaction>(true, []);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.ObjFormGroup = this.fb.group({
    //   RoleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]]});

    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');

    this.http.get<string>('http://localhost:65170/api/RoleAction/?RoleId=' + RoleId,{ headers: http() }).subscribe(value => {
      this.roleaction = JSON.parse(value);
    });

    this.http.get<string>('http://localhost:65170/api/RoleAction/?RoleId=' + RoleId,{ headers: http() }).subscribe(value => {
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
  checkboxLabel(row?: Roleaction): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ActionId + 1}`;
  }

  listRoleAction() {
    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    this.http.get<string>('http://localhost:65170/api/RoleAction/?RoleId=' + RoleId,{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  getId(id) {
    this.roleId = id;
  }
  DeleteRoleAction(idAction: string) {
    if (confirm('Are you sure you to delete this Action?')) {
      const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
      this.http.delete<string>('http://localhost:65170/api/RoleAction/?idAction=' + idAction + '&idRole=' + RoleId,{ headers: http() }).subscribe((res) => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.roleactions = this.roleactions.filter(b => b.ActionId !== this.actionId);
          this.toastr.success('Delete success!', '');
          this.listRoleAction();
        } else {
          this.toastr.success('Delete fail !', '');
        }

      });
    }
  }

  clickToAddAction() {
    const RoleId = this.activatedRoute.snapshot.paramMap.get('RoleId');
    this.router.navigate(['Role/RoleActionAdd/', RoleId]);
  }
  clickToGoBack() {
    this.router.navigate(['Role/']);
  }
}

