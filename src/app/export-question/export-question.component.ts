import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-export-question',
  templateUrl: './export-question.component.html',
  styleUrls: ['./export-question.component.scss']
})
export class ExportQuestionComponent implements OnInit {

  constructor(private myservice:MyserviceService, private router: Router) {  this.router.events.subscribe((event) => {
    this.myservice.changeMessage('1');
 });}

  ngOnInit() {
  }

}
