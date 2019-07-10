import 'hammerjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Category } from '../ICategory';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categorys: Category[] = [];
  cateInfo: Category;
  cateId = '';
  cateIdd = '';
  cateIdArray = "";
  insertForm: FormGroup;
  unamePattern = "^[A-Za-z-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫]+[A-Za-z0-9a-z-vxyàáâãèéêìíòóôõùúýỳỹỷỵựửữừứưụủũợởỡờớơộổỗồốọỏịỉĩệểễềếẹẻẽặẳẵằắăậẩẫầấạảđ₫.''/# ]*$";
  public dataLength: number;
  constructor(private http: HttpClient,private myservice:MyserviceService,
    private router: Router, private toastr: ToastrService) {
      this.router.events.subscribe((event) => {
        this.myservice.changeMessage('1');
     });
     }
  displayedColumn: string[] = ['select', 'Name', 'Description', 'Status', 'CreatedBy', 'CreatedDate', 'Action'];
  dataSource = new MatTableDataSource<Category>(this.categorys);

  selection = new SelectionModel<Category>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  FormatData(data) {
    if (data) {
      data.map(item => {
        item.StatusName = item.Status === 1 ? 'Active' : 'Disable';
      });
      return data;
    }
  }
  get Name(): FormControl {
    return this.insertForm.get('Name') as FormControl;
  }
  get Description(): FormControl {
    return this.insertForm.get('Description') as FormControl;
  }
  get Status(): FormControl {
    return this.insertForm.get('Status') as FormControl;
  }
  getlist()
  {
    this.http.get<string>('http://localhost:65170/api/category',{ headers: http() }).subscribe(value => {
      this.dataSource.data = this.FormatData(JSON.parse(value));
      console.log(value);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }
  ngOnInit() {
    
    this.http.get<string>('http://localhost:65170/api/category',{ headers: http() }).subscribe(value => {
      this.dataSource.data = this.FormatData(JSON.parse(value));
      console.log(value);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
    
    this.insertForm = new FormGroup(
      {
        Name: new FormControl('', [Validators.required],),
        Description: new FormControl('', [Validators.required]),
        Status: new FormControl('', [Validators.required]),
      }

    );
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
  checkboxLabel(row?: Category): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.Name + 1}`;
  }

  onSubmit() {
    const value = this.insertForm.value;

    console.log(value);
    if (this.insertForm.valid) {

      this.http.post('http://localhost:65170/api/category/', JSON.stringify(value), { headers: http() })
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/api/category',{ headers: http() }).subscribe(value => {
              this.dataSource.data = this.FormatData(JSON.parse(value));
              this.toastr.success('Create success!', '');
            });
          },
          error: (err) => {
            console.error(err);
          }
        });
    }
  }
  detail(id: string) {
    this.http.get<string>('http://localhost:65170/api/category/' + id,{ headers: http() })
      .subscribe(s => {
        this.cateInfo = JSON.parse(s);

        this.insertForm.patchValue(this.cateInfo);
        console.log(this.cateInfo);
      });
  }
  delete(Id) {
    this.cateId = Id;
    console.log(this.cateId);
  }
  deleteCate() {
    this.http.delete('http://localhost:65170/api/category/' + this.cateId,{ headers: http() }).subscribe(
      res => {

        if (res == 1) {
          this.dataSource.data = this.dataSource.data.filter(s => s.Id !== this.cateId);
          this.toastr.success('Delete success!', '');
        }

        else if (res == 0) {
          this.toastr.error('Category đang được sử dụng', 'Delete Fail');
        }
        else {
          confirm("Lỗi");
        }
      }
    );
  }
  reset() {
    this.insertForm.reset();
  }
  submitEdit(id) {
    console.log(id);
    const value = this.insertForm.value;
    console.log(this.insertForm);
    console.log(value);
    if (this.insertForm.valid) {
      this.http.put('http://localhost:65170/api/category/' + id, JSON.stringify(value), { headers: http() })
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/api/category',{ headers: http() }).subscribe(value => {
              this.dataSource.data = this.FormatData(JSON.parse(value));
              this.toastr.success('Update success!', '');
            });
            this.insertForm.reset();
          },
          error: (err) => {
            console.error(err);
          }
        });
    }
  }

  public doFilter = (value: string) => {
    console.log(value);
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  removeSelectedRows1() {
    let arrId = '';
    this.selection.selected.forEach(item => {
      arrId += item.Id + ',';
    });
    arrId = arrId.substring(0, arrId.length - 1);
    this.http.post('http://localhost:65170/api/Category?action=delete', JSON.stringify(arrId), { headers: http() }).subscribe((e) => {
      console.log(typeof (e));
      if (+e >= 1) {
        this.toastr.success('Delete all success!', '');
       this.getlist();
      } else if (+e == 0) {
        this.toastr.error('Category đang được sử dụng', 'Delete Fail');
      } else {
        this.toastr.warning('Something wrong!', '');
      }
    }
    );
    this.selection = new SelectionModel<Category>(true, []);
  }
}
