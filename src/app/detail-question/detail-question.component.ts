import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Question } from '../question';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { http } from '../http-header';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-detail-question',
  templateUrl: './detail-question.component.html',
  styleUrls: ['./detail-question.component.scss']
})
export class DetailQuestionComponent implements OnInit {

  Question: Question;

  constructor(private http: HttpClient,private myservice:MyserviceService, private fb: FormBuilder, private router: Router, private activedRoute: ActivatedRoute) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }
  question: Question;
  ngOnInit() {
    debugger;
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
    // const IdQuestion = this.activedRoute.snapshot.paramMap.get('Id')
    this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion,{ headers: http() }).subscribe(value => {

      console.log(value);

      this.Question = JSON.parse(value).Data;


    });
  }
}



