import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Isemaster } from 'src/app/isemaster';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ObjectResult } from '../object-result';
import { ToastrService } from 'ngx-toastr';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-view-list-semaster',
  templateUrl: './view-list-semaster.component.html',
  styleUrls: ['./view-list-semaster.component.scss']
})
export class ViewListSemasterComponent implements OnInit {
  public dateTime: Date;
  public dateTime1: Date;
  panelOpenState = false;
  searchString: string;
  ctForm: FormGroup;
  ctForm2: FormGroup;
  filterForm: FormGroup;
  cloneSemester: Isemaster = {} as Isemaster;
  get SemesterName(): FormControl {
    return this.ctForm.get('SemesterName') as FormControl
  }
  get StartDay(): FormControl {
    return this.ctForm.get('StartDay') as FormControl
  }
  get EndDay(): FormControl {
    return this.ctForm.get('EndDay') as FormControl
  }
  get Code(): FormControl {
    return this.ctForm.get('Code') as FormControl
  }
  get status(): FormControl {
    return this.ctForm.get('status') as FormControl
  }

  semesterExams: Isemaster[] = [];
  constructor(private myservice:MyserviceService, private semaster: FormBuilder, private fl: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog,private toastr:ToastrService) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }
  displayedColumn: string[] = ['select', 'ID', 'SemesterName', 'StartDay', 'EndDay', 'Code', 'status', 'action'];
  dataSource = new MatTableDataSource<Isemaster>(this.semesterExams);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selection = new SelectionModel<Isemaster>(true, []);

  //Chon tat ca checkbox
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  //
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  //hien thi da duoc check
  checkboxLabel(row?: Isemaster): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.ID + 1}`;
  }

  error: any = { isError: false, errorMessage: '' };
  compareTwoDates() {
    if (new Date(this.ctForm.controls['EndDay'].value) < new Date(this.ctForm.controls['StartDay'].value)) {
      this.error = { isError: true, errorMessage: 'End Date cant before start date !' };
    }
    else {
      this.error = { isError: false, errorMessage: '' };
    }
  }

  ngOnInit() {
    this.ctForm = this.semaster.group({
      SemesterName: ['', [Validators.required]],
      StartDay: ['',[Validators.required]],
      EndDay: ['',[Validators.required]],
      status: ['',[Validators.required]],
    });
    this.ctForm2 = this.semaster.group({
      SemesterName: ['', [Validators.required]],
      StartDay: [''],
      EndDay: [''],
      status: [''],
    });
    this.filterForm = this.fl.group({
      StartDay: [''],
      EndDay: [""]
    });
    this.http.get<string>('http://localhost:65170/SemesterExam',{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  list() {
    this.http.get<string>('http://localhost:65170/SemesterExam',{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value).Data;
      console.log(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }
  delete(id: string) {
    if (confirm('you want to hide record')) {
      this.http.delete('http://localhost:65170/SemesterExam/' + id,{ headers: http() }).subscribe
        (
          res => {
            this.http.get<string>('http://localhost:65170/SemesterExam',{ headers: http() }).subscribe(value => {
              this.dataSource.data = JSON.parse(value).Data;
              console.log(value);
              console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
            });
            this.semesterExams = this.semesterExams.filter(s => s.ID !== id);
            this.list();
            this.toastr.success('Hide success!', '');
          });
    }
  }

  onSearch() {
    this.http.get<string>('http://localhost:65170/api/SemesterExam/?searchString=' + this.searchString,{ headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
    });
  }

  onSubmit() {
    const value = this.ctForm.value;
    console.log(value);
    if (this.ctForm.valid) {
      this.http.post('http://localhost:65170/SemesterExam/Post', JSON.stringify(value), { headers: http() })
        .subscribe({
          next: (res) => {
            this.http.get<string>('http://localhost:65170/SemesterExam',{ headers: http() }).subscribe(value => {
              this.dataSource.data = JSON.parse(value);
              console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
            });
            this.list();
            this.toastr.success('Create success!', '');
          },
          error: (err) => {
            console.error(err);
          }
        });
    }

  }
  onSubmit2() {
    console.log("submit 2 work");
    console.log("submit 2 workdd");
    const value2 = this.ctForm2.value;
    console.log(value2);
    console.log(this.ctForm2.value);
    console.log("clone wprk");
    this.http.post('http://localhost:65170/SemesterExam/Post', JSON.stringify(value2), { headers: http() }).subscribe({
      next: (res) => {
        let result: any = JSON.stringify(res);
        if (result.Success == 1) {
          this.http.get<string>('http://localhost:65170/SemesterExam',{ headers: http() }).subscribe(value2 => {
            this.dataSource.data = JSON.parse(value2);
            console.log(this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort);
          });
        }
        this.list();
        this.toastr.success('Clone success!', '');
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  onFilter() {
    const value = this.filterForm.value;
    this.http.post<string>('http://localhost:65170/api/SemesterExam?action=filter', JSON.stringify(value), { headers: http() }).subscribe(value => {
      this.dataSource.data = JSON.parse(value);
    });

  }

  clone(ID: string, SemesterName: string, StartDay: string, EndDay: string) {

    this.cloneSemester.ID = ID;
    this.cloneSemester.SemesterName = SemesterName + "_clone";
    this.cloneSemester.StartDay = StartDay;
    this.cloneSemester.EndDay = EndDay;
    this.cloneSemester.status = "2";

    console.log(this.cloneSemester.ID);
    console.log(this.cloneSemester.SemesterName);
    this.ctForm2.patchValue(this.cloneSemester)
  }
}
