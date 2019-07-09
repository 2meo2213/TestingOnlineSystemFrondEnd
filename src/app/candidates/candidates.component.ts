import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { Icandidates } from 'src/app/Icandidates';
import { MatTableDataSource, MatSort, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Iuser } from '../iuser';
import { MyserviceService } from '../myservice.service';
// import { parse } from 'path';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  Id = this.activatedRoute.snapshot.paramMap.get('Id');
  CandidatesForm: FormGroup;
  get UserId(): FormControl {
    return this.CandidatesForm.get('UserId') as FormControl
  }
  get UserName(): FormControl {
    return this.CandidatesForm.get('UserName') as FormControl
  }
  get FulName(): FormControl {
    return this.CandidatesForm.get('FulName') as FormControl
  }
  get Email(): FormControl {
    return this.CandidatesForm.get('Email') as FormControl
  }
  get Department(): FormControl {
    return this.CandidatesForm.get('Department') as FormControl
  }
  get Position(): FormControl {
    return this.CandidatesForm.get('Position') as FormControl
  }

  // -------------------------UserId------------------------
  userId = '';
  // -------------------------------------------------------

  candidates: Icandidates[] = [];
  Users: Iuser[] = [];
  searchString: string = "";
  candi:Icandidates;
  constructor(private http: HttpClient, private myservice:MyserviceService,private router: Router, private candidate: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });

   }
  displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName', 'Email', 'Department', 'Position', 'action'];
  dataSource = new MatTableDataSource<Icandidates>(this.candidates);
  dataSource1 = new MatTableDataSource<Iuser>(this.Users);
  selection = new SelectionModel<Icandidates>(true, []);
  selection1 = new SelectionModel<Iuser>(true, []);
  userIdDelete: number;
  getId:'';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatPaginator) paginator2: MatPaginator;

  totalRow: number;
  totalRowUser: number;

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
    this.selection.clear() :
    this.dataSource.data.forEach(row => this.selection.select(row));
    console.log(this.dataSource.data);
  }
  checkboxLabel(row?: Icandidates): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.UserId + 1}`;
  }

  ngOnInit() {
    const GroupId = this.activatedRoute.snapshot.paramMap.get('1');
    this.http.get<string>('http://localhost:65170/api/semesterexamuser/1').subscribe(value => {
      console.log(value);
      this.dataSource = new MatTableDataSource<Icandidates>(JSON.parse(value));
      this.dataSource.paginator = this.paginator;
      this.totalRow = this.dataSource.data.length;
    });

    this.CandidatesForm = this.candidate.group({
      UserName: [''],
      FulName: [''],
      Email: [''],
      Department: [''],
      Position: ['']
    })
    this.http.get<string>('http://localhost:65170/api/semesterexamuser/1&userid=' + this.userId).subscribe(value => {
      this.candi = JSON.parse(value);
      console.log(this.candi);
  });
  }
  onKey(event) { this.searchString = event.target.value; }

  // -------------------------------------------Delete----------------------------------------------------
  DeleteCandidates() {
    const UserId = this.activatedRoute.snapshot.paramMap.get('userId');
    // console.log(this.userId);
    // this.http.delete('http://localhost:65170/api/UserGroup/?idgroup=' + GroupId + '&iduser=' + this.userId).subscribe((res) => {
    this.http.delete('http://localhost:65170/api/semesterexamuser/1&userid=' + this.userId).subscribe((res) => {
      this.candidates = this.candidates.filter(b => b.UserId !== this.userId);
      this.ngOnInit();
    });
  }
  // -------------------------------------------Delete----------------------------------------------------


  // ---------------------------------------ClickToRoute--------------------------------------------------
  // clickToRoute() {
  //   const SemesterExamId = this.activatedRoute.snapshot.paramMap.get('semesterExamId');
  //   this.router.navigate(['/candidates/create/', SemesterExamId]);
  // }
  // ---------------------------------------ClickToRoute--------------------------------------------------
getIdUser(id)
{
  this.getId=id;
  console.log(this.getId);
}
removeSelectedRows() {


  this.selection.selected.forEach(item => {

    console.log(item.UserId);
    this.http.delete('http://localhost:65170/api/semesterexamuser/' + item.UserId + '?semesterid=1',httpOptions).subscribe((res) => {
            this.dataSource.data = this.dataSource.data.filter(b => b.UserId !== item.UserId);
          });
          this.dataSource = new MatTableDataSource<Icandidates>(this.dataSource.data);
        });
         this.selection = new SelectionModel<Icandidates>(true, []);
}


  onSubmit() {
    if (this.CandidatesForm.valid) {
      const value = this.CandidatesForm.value;
      console.log(value);
      this.http.post('http://localhost:65170/api/User', JSON.stringify(value), httpOptions).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
      console.log(this.CandidatesForm.value);

    }
  }

  ClickDelete(row?: Iuser) {
    this.userIdDelete = parseInt(row.UserId);
    console.log(this.userIdDelete)
  }

  loadUser() {
    this.http.get<string>('http://localhost:65170/api/User').subscribe(value => {
      this.dataSource1 = new MatTableDataSource<Iuser>(JSON.parse(value));
      this.dataSource1.paginator = this.paginator2;
      this.totalRowUser = this.dataSource1.data.length;
      //  console.log(this.dataSource1.data.length)
    });
  }

  onSearch() {
    console.log('dadfasd');
    console.log(this.searchString);
    console.log(this.searchString);
    this.http.get<string>('http://localhost:65170/api/semesterexamuser?searchString=' + this.searchString + '&id=1' + '&type=2').subscribe(value => {
      this.dataSource.data = JSON.parse(value);
      console.log(value)
      console.log(this.dataSource.paginator = this.paginator);
    });
  }

  // removeSelectedRows() {
  //   this.selection.selected.forEach(item => {


      //  this.dataSource.data.splice(index,1);
        // this.http.delete('http://localhost:65170/api/UserGroup/?idgroup=' + UserGroupId + '&iduser=' + item.UserId).subscribe((res) => {
  //       this.http.delete('http://localhost:65170/api/semesterexamuser/' + this.getId + '?semesterid=1').subscribe((res) => {
  //       this.dataSource.data = this.dataSource.data.filter(b => b.UserId !== this.getId);
  //     });
  //     this.dataSource = new MatTableDataSource<Icandidates>(this.dataSource.data);
  //   });
  //   this.selection = new SelectionModel<Icandidates>(true, []);
  // }
  // -----------------------------------------------------------------------------------------------------

  // deleteCandidates(UserId: string) {
  // if (confirm("you want to delete")) {
  //   console.log(UserId)
  //   // this.http.delete('http://localhost:65170/api/semesterexamuser/1?userId='+ parseInt(UserId)+ 'semesterid=' + 1);
  //   // http://localhost:65170/api/semesterexamuser/1?userId=1&semesterid=1
  //   //.subscribe( s=> this.candidates = this.candidates.filter( c => c.UserId !== UserId));
  //   this.http.delete('http://localhost:65170/api/semesterexamuser/?userId=' + parseInt(UserId) + '&semesterid=1' + '&type=1').subscribe(value => {
  //     console.log(value);
  //     this.http.get<string>('http://localhost:65170/api/semesterexamuser/1').subscribe(value => {
  //       console.log(value);
  //       this.dataSource = new MatTableDataSource<Icandidates>(JSON.parse(value));
  //       this.dataSource.paginator = this.paginator;
  //       this.totalRow = this.dataSource.data.length;
  //     });
  //   });
  // }
  // }



  // deleteAllCandidates(SemesterId: string) {
  //   if (confirm("you want to delete")) {
  //     console.log(SemesterId)
  //     // this.http.delete('http://localhost:65170/api/semesterexamuser/1?userId='+ parseInt(UserId)+ 'semesterid=' + 1);
  //     // http://localhost:65170/api/semesterexamuser/1?userId=1&semesterid=1
  //     //.subscribe( s=> this.candidates = this.candidates.filter( c => c.UserId !== UserId));
  //     this.http.delete('http://localhost:65170/api/semesterexamuser/?semesterid=1').subscribe(value => {
  //       console.log(value);
  //       this.http.get<string>('http://localhost:65170/api/semesterexamuser/1').subscribe(value => {
  //         console.log(value);
  //         this.dataSource = new MatTableDataSource<Icandidates>(JSON.parse(value));
  //         this.dataSource.paginator = this.paginator;
  //         this.totalRow = this.dataSource.data.length;
  //       });
  //     });
  //   }
  // }
}
