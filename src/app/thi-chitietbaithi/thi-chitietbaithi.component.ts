import { MatPaginator, MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Group } from '../group';
import { ResultObject } from '../result-object';
import { Testbysemester } from '../testbysemester';
import { Isemaster } from '../isemaster';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-thi-chitietbaithi',
  templateUrl: './thi-chitietbaithi.component.html',
  styleUrls: ['./thi-chitietbaithi.component.scss']
})
export class ThiChitietbaithiComponent implements OnInit {
  TestId = this.activateRoute.snapshot.paramMap.get('TestId');
  constructor(private myservice:MyserviceService, private semaster: FormBuilder, private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog, public activateRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
   });
   }

  ngOnInit() {
  }

}
