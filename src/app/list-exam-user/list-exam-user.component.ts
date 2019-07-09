import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Isemaster } from '../isemaster';
import { Router, ActivatedRoute } from '@angular/router';
import { Exam } from '../exam';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Component({
  selector: 'app-list-exam-user',
  templateUrl: './list-exam-user.component.html',
  styleUrls: ['./list-exam-user.component.scss']
})
export class ListExamUserComponent implements OnInit {
  semester: Exam[] = [];
  notify: boolean = true;
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  constructor(private http: HttpClient, private router: Router, private myservice: MyserviceService, private activedRoute: ActivatedRoute, ) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
    });
  }

  ngOnInit() {
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
    this.http.get<string>('http://localhost:65170/api/SemesterCustomer/' + IdQuestion, { headers: http() }).subscribe(
      value => {

        this.semester = JSON.parse(value).Data;
        // console.log(IdQuestion);
        // console.log(value);

        if (this.semester.length > 0 && typeof this.semester !== 'undefined') {

          this.notify = false;
        } else {
          this.notify = true;
        }

      });

    if (sessionStorage.getItem('user')) {
      this.Users = sessionStorage.getItem('user');
      this.LisUser = this.Users.split(',');
      this.UserName = this.LisUser[1];
      this.UserId = this.LisUser[0];


    } else {
      this.Users = null;
    }

  }
  listExam(id) {

  }

  Logout() {
    sessionStorage.removeItem('currentPermission');
   this.router.navigate(['/']);


    sessionStorage.removeItem('user');
  }

}
