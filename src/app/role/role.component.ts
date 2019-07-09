import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Role } from '../role';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { SelectionModel } from '@angular/cdk/collections';
import { ResultObject } from '../result-object';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  roles: Role[] = [];
  RoleId: '';
  public Editor = ClassicEditorBuild;
  constructor(private http: HttpClient,private myservice:MyserviceService, private router: Router, private fb: FormBuilder,private toastr: ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
  displayedColumn: string[] = [ 'RoleName', 'Description', 'Action'];
  dataSource = new MatTableDataSource<Role>(this.roles);
  selection = new SelectionModel<Role>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  createForm: FormGroup;

  get RoleName(): FormControl {
    return this.createForm.get('RoleName') as FormControl;
  }
  get Description(): FormControl {
    return this.createForm.get('Description') as FormControl;
  }


  ngOnInit() {
    this.listRole();
    this.createForm = this.fb.group({
      RoleName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
      Description :['']
    });

  }

  listRole() {
    this.http.get<string>('http://localhost:65170/api/Role',{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }

  getId(id) {
    this.RoleId = id;
  }

  DeleteRole(Id: string) {
    if (confirm('Are you sure you to delete this role?')) {
      this.http.delete<string>('http://localhost:65170/api/Role/?id=' + Id,{ headers: http() }).subscribe(res => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.roles = this.roles.filter(b => b.RoleId !== Id);
          this.toastr.success('Delete success!', '');
          this.listRole();
        } else {
          this.toastr.error('Delete success!', '');
        }
      });
    }
  }

  onSubmit() {
    console.log(this.createForm.value);
    if (this.createForm.valid) {
      const value = this.createForm.value;
      console.log(value);
      this.http.post<string>('http://localhost:65170/api/Role', JSON.stringify(value), { headers: http() }).subscribe({
        next: (res) => {
          const result: ResultObject = JSON.parse(res);
          if (result.Success >= 1) {
            this.toastr.success('Create success!', '');
            
          } else {
            this.toastr.success('Create fail !', '');
          }
          this.createForm.reset();
          this.listRole();
        },
        error: (err) => {
          console.log(err);
        }
      });

    }
  }
  clickToRoute() {
    this.router.navigate(['Role/', this.RoleId]);
  }
  validateForm() {
    if (this.createForm.invalid) {
      this.createForm.get('RoleName').markAsTouched();
      return;
    }
  }
}