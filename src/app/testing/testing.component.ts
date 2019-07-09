import { Component, OnInit, Input, OnDestroy, Pipe, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { TestProcessing } from '../test-processing';
import { ProcessingTest } from '../processing-test'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss']
})
@Pipe({
  name: 'minuteSeconds'
})
export class TestingComponent implements OnInit {
  Users: string;
  LisUser;
  UserId: string;
  UserName: string;
  constructor(private myservice:MyserviceService, private semaster: FormBuilder, private fb: FormBuilder, private http: HttpClient, private router: Router, public dialog: MatDialog, public activateRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('2');
   });
   }
  testProcessings: TestProcessing;
  questions: Question[];
  i: number;
  j: number;
  content: string;
  a: number;
  b: number;
  answer = [];
  counting: number;
  remainingTime: number;
  private intervalId = 0;
  message = '';
  arrayId = [];
  mang = [];
  checked = true;
  EndTest;
  startTest;
  time;
  CheckTime;
  second:number;
  NameExam:string;
  testCount:number;
  Idtest = this.activateRoute.snapshot.paramMap.get('TestId');
  ngOnInit() {
    
    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Idtest + '?IsgetTestProcessing', httpOptions).subscribe(
      value => {
        this.testProcessings = JSON.parse(value);
        this.testCount=this.testProcessings.Questions.length;
        console.log(this.testCount);
        this.questions = this.testProcessings.Questions;
        console.log(this.testProcessings);
        console.log(this.questions = this.testProcessings.Questions);
        this.second = this.testProcessings.TestTime;
        console.log(this.second);
this.NameExam=this.testProcessings.TestName;
 console.log(this.NameExam);
        this.reset();
        this.start();
       
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
  Onclick(id, btnid) {

    this.a = this.questions.findIndex(d => d.Id == btnid);
    this.answer = this.questions[this.a].Answers;
    let dem = 0;
    for (var i = 0; i < this.questions[this.a].Answers.length; i++) {

      if (document.getElementById("check" + this.questions[this.a].Answers[i].Id).checked) {
        dem++;
        if (this.arrayId.indexOf(this.questions[this.a].Answers[i].Id) == -1) {
          this.arrayId.push(this.questions[this.a].Answers[i].Id);

        }
        if (dem > 0) {
          document.getElementById("btn" + btnid).classList.add("button-selected");
        }
      }

    }

    if (!document.getElementById("check" + id).checked) {
      dem--;
      for (var n = 0; n < this.arrayId.length; n++) {
        if (this.arrayId[n] == id) {
          this.arrayId.splice(n, 1);
          console.log(this.arrayId)
        }
      }
      if (dem === -1) {
        document.getElementById("btn" + btnid).classList.remove("button-selected");
      }
    }
  }
  scroll(btnid) {
    var elmnt = document.getElementById("table" + btnid);
    elmnt.scrollIntoView();
  }
  clearTimer() {
    clearInterval(this.intervalId);
  }
  start() {
    this.countDown();
    if (this.remainingTime <= 0) {
      this.remainingTime = this.second;
    }
  }
 
  stop() {
    this.clearTimer();
    this.message = `Holding at T-${this.remainingTime} seconds`;
  }
  reset() {
    this.clearTimer();
    this.remainingTime = this.counting;
    this.message = `Click start button to start the Countdown`;
  }

  private countDown() {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.remainingTime -= 1;
     
      var session=null;
      if(localStorage.getItem('SecondTest')){
         session = localStorage.getItem('SecondTest');
      }else{
        session=0;
      }
    
        var a = new Date();
        this.EndTest = a.getHours() * 60 + a.getMinutes();
      
        this.startTest = +session;
       
      
       
       if (this.EndTest - this.startTest >= this.second) {
         localStorage.clear();
         this.router.navigate(['/thi/' + this.Idtest + '/' + this.Idtest + '/ketqua']);
      
       
      
      }
    }, 1000);

  }


  summit() {
    const Idtest = this.testProcessings.Id;
    var arr = this.arrayId;
    console.log(arr);
    console.log(Idtest);

    this.http.post('http://localhost:65170/SemesterExam/submid/' + this.Idtest + '?userID=' + this.UserId, JSON.stringify(arr), httpOptions).subscribe(
      value => (console.log(value))

    )
    if (confirm('Bạn có muốn nộp bài')) {
      localStorage.clear();
    
      this.router.navigate(['/thi/' + this.Idtest + '/' + this.Idtest + '/ketqua']);
    }

   
  }
}
