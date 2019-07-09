import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultObject } from 'src/app/result-object';
import { http } from 'src/app/http-header';
import { MyserviceService } from 'src/app/myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Component({
  selector: 'app-export-exam',
  templateUrl: './export-exam.component.html',
  styleUrls: ['./export-exam.component.scss']
})
export class ExportExamComponent implements OnInit {
exam:string;
  constructor(private myservice:MyserviceService,private http: HttpClient, private router: Router, private ac: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  ngOnInit() {
    //confirm('Bạn có muốn lưu file ?? ')
    const examID = this.ac.snapshot.paramMap.get('Id');
    this.http.get<string>('http://localhost:65170/api/Exam/' + examID+'?action=exportExam',{ headers: http() }).subscribe({
      next: (res) => {
        console.log(res);
        const res1 :ResultObject = JSON.parse(res);
        this.exam= res1.Message;
       
       
      },
      error: (err) => {
       
        console.log('false');
        var errors=err.status+','+err.message;
        this.myservice.changeError(errors);
       
      },
     

    });
    setTimeout(()=>{
      window.print();
    },3000);
  }

}
