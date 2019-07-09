import { Component, OnInit } from '@angular/core';

import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
// import { Exam } from '../exam';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { BrowserModule } from '@angular/platform-browser';
import { ReportSemester } from '../report-semester';
import { ObjectResult } from '../object-result'
import { MyserviceService } from '../myservice.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-manager-semester-exam-report',
  templateUrl: './manager-semester-exam-report.component.html',
  styleUrls: ['./manager-semester-exam-report.component.scss']
})
export class ManagerSemesterExamReportComponent implements OnInit {

  report: ReportSemester;
  constructor(private http: HttpClient, private router: Router, private myservice:MyserviceService,private activeRoute: ActivatedRoute) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }
  low: number = 0;
  good: number = 0;
  medium: number = 0;
  count: string;
  Id = this.activeRoute.snapshot.paramMap.get('Id');
  public pieChartData: number[]=[12,12,10];
  public pieChartType: string;
  public pieChartOptions: any = {
    'backgroundColor': [
      "#FF6384",
      "#4BC0C0",
      "#FFCE56",
      // "#E7E9ED",
      // "#36A2EB"
    ]
  }
  ngOnInit() {







    this.http.get<string>('http://localhost:65170/api/SemesterExam/' + this.Id).subscribe(
      value => {
        let result = JSON.parse(value)
        if (result.Success = 1) {
        this.report = JSON.parse(value).Data;
          this.low = this.low + this.report.Low;
          this.medium = this.medium + this.report.Medium;
          this.good = this.good + this.report.Good;
          console.log ( 'low:'+this.low)
          console.log ( 'medium:'+this.medium)
          console.log ( 'good:'+this.good)
          console.log(this.report);


          this.pieChartData = [this.low, this.medium, this.good];
          console.log(this.pieChartData);
          if (this.low == 0 && this.medium == 0 && this.good == 0) {
            this.pieChartData = [1, 1, 1];
          }
        }
        else {
          confirm("lỗi");
        }
      }
    );




    this.pieChartType = 'pie';
    console.log(this.pieChartData);
  }




  public pieChartLabels: string[] = ["yếu", "trung bình", "giỏi"];


  // events on slice click
  public chartClicked(e: any): void {
    console.log(e);
  }

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

}
  // public chartType: string = 'pie';

  // public chartDatasets: Array<any> = [
  //   { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  // ];

  // public chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];

  // public chartColors: Array<any> = [
  //   {
  //     backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
  //     hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
  //     borderWidth: 2,
  //   }
  // ];

  // public chartOptions: any = {
  //   responsive: true
  // };
  // public chartClicked(e: any): void { }
  // public chartHovered(e: any): void {
