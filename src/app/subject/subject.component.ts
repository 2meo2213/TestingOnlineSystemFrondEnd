import 'hammerjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ISubject } from '../isubject';
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
subjects:ISubject[]=[];
subInfo:ISubject;
subId='';
insertForm:FormGroup;
  constructor(private http: HttpClient,private myservice:MyserviceService,
    private router: Router, private toastr: ToastrService) {this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   } 
   displayedColumn: string[] = ['select', 'SubjectName','Status','CreatedDate','Action'];
   dataSource = new MatTableDataSource<ISubject>(this.subjects);

   selection = new SelectionModel<ISubject>(true, []);
 
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
  get SubjectName(): FormControl {
    return this.insertForm.get('SubjectName') as FormControl;
  }
  get Status(): FormControl {
    return this.insertForm.get('Status') as FormControl;
  }


  getlist()
  {
    this.http.get<string>('http://localhost:65170/api/subject',{ headers: http() }).subscribe(value => {
      this.dataSource.data = this.FormatData(JSON.parse(value));
      console.log(value);
      this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
    });
  }
  ngOnInit() {this.http.get<string>('http://localhost:65170/api/subject',{ headers: http() }).subscribe(value => {
    this.dataSource.data = this.FormatData(JSON.parse(value));
    console.log(value);
    this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
  });
  
  this.insertForm = new FormGroup(
    {
      SubjectName: new FormControl('', [Validators.required],),
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
checkboxLabel(row?: ISubject): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.SubjectName + 1}`;
}

onSubmit() {
  const value = this.insertForm.value;

  console.log(value);
  if (this.insertForm.valid) {

    this.http.post('http://localhost:65170/api/subject/', JSON.stringify(value), { headers: http() })
      .subscribe({
        next: (res) => {
          this.http.get<string>('http://localhost:65170/api/subject',{ headers: http() }).subscribe(value => {
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
  this.http.get<string>('http://localhost:65170/api/subject/' + id,{ headers: http() })
    .subscribe(s => {
      this.subInfo = JSON.parse(s);

      this.insertForm.patchValue(this.subInfo);
      console.log(this.subInfo);
    });
}
delete(Id) {
  this.subId = Id;
  console.log(this.subId);
}

deleteCate() {
  this.http.delete('http://localhost:65170/api/subject/' + this.subId,{ headers: http() }).subscribe(
    res => {

     
        this.dataSource.data = this.dataSource.data.filter(s => s.SubjectID !== this.subId);
        this.toastr.success('Delete success!', '');
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
      this.http.put('http://localhost:65170/api/subject/' + id, JSON.stringify(value), { headers: http() })
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/api/subject',{ headers: http() }).subscribe(value => {
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
  removeSelectedRows1() {
    let arrId = '';
    this.selection.selected.forEach(item => {
      arrId += item.SubjectID + ',';
    });
    arrId = arrId.substring(0, arrId.length - 1);
    this.http.post('http://localhost:65170/api/Subject?action=delete', JSON.stringify(arrId), { headers: http() }).subscribe((e) => {
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
    this.selection = new SelectionModel<ISubject>(true, []);
  }

}
