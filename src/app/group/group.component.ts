import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Group } from '../group';
import { ResultObject } from '../result-object';
import { http } from '../http-header';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MyserviceService } from '../myservice.service';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  searchString: string;
  groups: Group[] = [];
  groupId = '';
  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder,private myservice:MyserviceService) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }
  displayedColumn: string[] = ['select', 'GroupId', 'GroupName', 'Creator', 'Description', 'CreatedDate', 'EditedDate', 'Action'];
  dataSource = new MatTableDataSource<Group>(this.groups);
  selection = new SelectionModel<Group>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  createForm: FormGroup;
  filterForm: FormGroup;

  get GroupName(): FormControl {
    return this.createForm.get('GroupName') as FormControl;
  }
  get Creator(): FormControl {
    return this.createForm.get('Creator') as FormControl;
  }
  get Description(): FormControl {
    return this.createForm.get('Description') as FormControl;
  }

  get StartDate(): FormControl {
    return this.filterForm.get('StartDate') as FormControl;
  }
  get EndDate(): FormControl {
    return this.filterForm.get('EndDate') as FormControl;
  }
  validateForm() {
    if (this.createForm.invalid) {
      this.createForm.get('GroupName').markAsTouched();
      this.createForm.get('Creator').markAsTouched();
      this.createForm.get('Description').markAsTouched();
      return;
    }
  }
  listgroup() {
    // const permission = localStorage.getItem('currentPermission');
    // const http: HttpHeaders = new HttpHeaders({ 'permission': permission });
    this.http.get<string>('http://localhost:65170/api/Group', { headers: http() }).subscribe({
      next: (value) => {
        this.dataSource.data = JSON.parse(value).Data;
        console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error.Message);
      }
    });
  }
  ngOnInit() {
    this.listgroup();

    this.createForm = this.fb.group({
      GroupName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      Creator: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      Description: ['', [Validators.maxLength(50)]]
    });
    this.filterForm = this.fb.group({
      StartDate: [''],
      EndDate: ['']
    });
  }
  onSubmit() {
    if (this.createForm.valid) {
      const value = this.createForm.value;
      console.log(value);
      this.http.post<string>('http://localhost:65170/api/Group', JSON.stringify(value), { headers: http() }).subscribe({
        next: (res) => {
          const result: ResultObject = JSON.parse(res);
          if (result.Success >= 1) {
            confirm('Create success!');
            this.http.get<string>('http://localhost:65170/api/Group', { headers: http() }).subscribe(value => {
              this.dataSource.data = JSON.parse(value).Data;
              console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
            });
          } else {
            confirm('Create Fail!');
          }
          this.createForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          alert(err.error.Message);
        }
      });
    }
  }

  onSearch() {
    this.http.get<string>('http://localhost:65170/api/Group?searchString=' + this.searchString, { headers: http() }).subscribe
      ({
        next: (value) => {
          this.dataSource.data = JSON.parse(value).Data;
          console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
        }, error: (err: HttpErrorResponse) => {
          console.log(err);
          alert(err.error.Message);
        }
      });
  }
  getId(id) {
    this.groupId = id;
  }
  onDelete() {
    this.http.delete<string>('http://localhost:65170/api/Group/' + this.groupId, { headers: http() }).subscribe({
      next: (res) => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.groups = this.groups.filter(b => b.GroupId !== this.groupId);
          confirm('Delete success!');
          this.listgroup();
        } else {
          confirm('Delete failed!');
        }
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error.Message);
      }
    });
  }

  removeSelectedRows() {
    if (confirm('Delete selected?')) {
      this.selection.selected.forEach(item => {
        this.http.delete<string>('http://localhost:65170/api/Group/' + item.GroupId, { headers: http() }).subscribe(
          {
            next: (res) => {
              let result = JSON.parse(res);
              if (result.Success == 1) {
                this.dataSource.data = this.dataSource.data.filter(b => b.GroupId !== item.GroupId);
                confirm('Delete success!');
                this.listgroup();
              } else {
                confirm('Delete failed!');
              }
              this.selection = new SelectionModel<Group>(true, []);
            },
            error: (err: HttpErrorResponse) => {
              console.log(err);
              alert(err.error.Message);
            }
          }
          // this.dataSource = new MatTableDataSource<Group>(this.dataSource.data);
        );
      });
    }
  }

  onFilter() {
    const value = this.filterForm.value;
    console.log(this.filterForm.value);
    this.http.post<string>('http://localhost:65170/api/Group/?action=filter', JSON.stringify(value), { headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Group): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.GroupId + 1}`;
  }

  logout() {
    sessionStorage.removeItem('currentPermission');
    this.router.navigate(['']);
    sessionStorage.removeItem('user');
  }
}
