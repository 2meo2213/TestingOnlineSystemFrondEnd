import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { IcandidateAdd } from '../icandidates-add';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss']
})
export class AddCandidatesComponent implements OnInit {
    addcandidates: IcandidateAdd[] = [];
    constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) { }
    displayedColumn: string[] = ['select', 'UserId', 'UserName', 'FullName', 'Email', 'Department', 'Position',];
    dataSource = new MatTableDataSource<IcandidateAdd>(this.addcandidates);
    selection = new SelectionModel<IcandidateAdd>(true, []);
    UserId = '';
    SemesterId:'';
    Id = this.activatedRoute.snapshot.paramMap.get('Id');


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    ngOnInit() {
      // ----------------------------------------------?????????????----------------------------------------------
      this.http.get<string>('http://localhost:65170/api/SemesterExamUser/?semesterid=1' ).subscribe(value => {
      // ----------------------------------------------?????????????----------------------------------------------

        this.dataSource.data = JSON.parse(value);
        console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator, this.dataSource.sort = this.sort;
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
    checkboxLabel(row?: IcandidateAdd): string {
      if (!row) {
        return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.FullName + 1}`;
    }
    public doFilter = (value: string) => {
      this.dataSource.filter = value.trim().toLocaleLowerCase();
    }
    getId(id)
    {
      this.UserId=id;
    }
    AddSelectedRows() {
      this.selection.selected.forEach(item => {
        const SemesterId = this.activatedRoute.snapshot.paramMap.get('semesterId');
        const id =this.dataSource.data.filter(d=>d.UserId==this.UserId);
        console.log(item.UserId);
        console.log(SemesterId);
        //  this.dataSource.data.splice(index,1);
      // ----------------------------------------------?????????????----------------------------------------------
        this.http.post<string>('http://localhost:65170/api/SemesterExamUser/?userid=' + item.UserId+'&semesterid=1', httpOptions).subscribe(
      // ----------------------------------------------?????????????----------------------------------------------
          value => {
            this.dataSource.data = JSON.parse(value);
      // ----------------------------------------------?????????????----------------------------------------------
            this.http.get<string>('http:localhost:65170/api/SemesterExamUser/?semesterid=1').subscribe(value => {
      // ----------------------------------------------?????????????----------------------------------------------
              this.dataSource.data = JSON.parse(value);
              console.log(this.addcandidates);
            });
          }
        );
        this.dataSource = new MatTableDataSource<IcandidateAdd>(this.dataSource.data);
      });
      this.selection = new SelectionModel<IcandidateAdd>(true, []);
    }
    // clickToRoute() {
    //   this.router.navigate(['group/usergroup/']);
    // }
    clickToRoute() {
      const GroupId = this.activatedRoute.snapshot.paramMap.get('groupId');
      this.router.navigate(['group/usergroup/usergroupadd/', GroupId]);
    }
    clickToGoBack() {
      this.router.navigate(['group/']);
    }
  }
