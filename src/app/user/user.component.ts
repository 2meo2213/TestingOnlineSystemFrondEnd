import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { User } from '../user';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  searchString: string;
  PositionApi: [];
  DepartmentApi: [];
  users: User[] = [];
  userId = '';
  user: User;
  getUsers: User;
  constructor(private myservice:MyserviceService, private http: HttpClient, private router: Router, private fb: FormBuilder,private toar:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
  displayedColumn: string[] = ['select', 'UserName', 'FullName', 'Email', 'Department', 'Position', 'Action'];
  dataSource = new MatTableDataSource<User>(this.users);
  selection = new SelectionModel<User>(true, []);

  filterForm: FormGroup;

  get Position(): FormControl {
    return this.filterForm.get('Position') as FormControl;
  }
  get Department(): FormControl {
    return this.filterForm.get('Department') as FormControl;
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  listuser() {
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http() }).subscribe({
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
  Edit(userId: string) {
    this.router.navigate(['/user', 'update', userId]);
  }

  ngOnInit() {
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http() }).subscribe({
      next:(value) => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error.Message);
      }
    });
    this.filterForm = this.fb.group({
      Position: [''],
      Department: ['']
    });
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http() }).subscribe({
      next:(value) => {
      this.PositionApi = JSON.parse(value).Data;
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.Message);
    }      
    });
    this.http.get<string>('http://localhost:65170/api/User',{ headers: http() }).subscribe({
        next:(value) => {
        this.DepartmentApi = JSON.parse(value).Data;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error.Message);
      }
    });
  }

  onSearch() {
    this.http.get<string>('http://localhost:65170/api/User?searchString=' + this.searchString,{ headers: http() }).subscribe(
      {next:(value) => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
        alert(err.error.Message);
      }
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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`;
  }
  onFilter() {
    const value = this.filterForm.value;
    console.log(value);
    this.http.post<string>('http://localhost:65170/api/User/?action=filter', JSON.stringify(value),
    { headers: http() }).subscribe({
      next:(value) => {
        this.dataSource.data = JSON.parse(value).Data;
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.Message);
    }
      });
  }
  detail(id) {
    this.userId = id;
    console.log(this.userId);
    this.http.get<string>('http://localhost:65170/api/User/?userid=' + this.userId,{ headers: http() }).subscribe(
      {next:(value) => {
      this.getUsers = JSON.parse(value);
      console.log(this.getUsers);
    },
    error: (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.Message);
    }
  });
    this.http.get<string>('http://localhost:65170/api/User/' + this.userId,{ headers: http() }).subscribe(
  {
    next: (value) => {
      this.user = JSON.parse(value);
      console.log(value);
    },
  error: (err: HttpErrorResponse) => {
    console.log(err);
    alert(err.error.Message);
  }   
  });
  }

  onDelete(id: string) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.http.delete<string>('http://localhost:65170/api/User/' + id, { headers: http() }).subscribe(
        {next:(res) => {
        let result = JSON.parse(res);
        if (result.Success == 1) {
          this.users = this.users.filter(b => b.UserId !== id); 
          this.toar.success('success','Delete User');        
          this.listuser();
        } else if (result.Success == 0) {
          this.toar.warning('Error!This user is in use');
        } else {
          this.toar.warning('Fail','Delete User');
        }
      },
      error: (err: HttpErrorResponse) => {
      console.log(err);
      alert(err.error.Message);
      }   
      });
    }
  }

  removeSelectedRows(id: string) {
    if (confirm('Delete selected?')) {
      this.selection.selected.forEach(item => {
        this.http.delete<string>('http://localhost:65170/api/User/' + item.UserId,{ headers: http() }).subscribe(
         {
          next:(res) => {
            let result = JSON.parse(res);
            if (result.Success == 1) {
              this.dataSource.data = this.dataSource.data.filter(b => b.UserId !== item.UserId);
              this.toar.success('success','Delete User');     
              this.listuser();
            } else if (result.Success == 0) {
              this.toar.warning('Error!This user is in use');
            } else {
              this.toar.warning('Fail','Delete User');
            }
          },
          error: (err: HttpErrorResponse) => {
            console.log(err);
            alert(err.error.Message);
          }
         } 
        );
      });
      this.selection = new SelectionModel<User>(true, []);
    }
  }
}




