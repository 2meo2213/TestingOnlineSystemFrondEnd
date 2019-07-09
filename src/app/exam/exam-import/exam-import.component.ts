import { Component, OnInit } from '@angular/core';
import { ResultObject } from 'src/app/result-object';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { http } from 'src/app/http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from 'src/app/myservice.service';

@Component({
  selector: 'app-exam-import',
  templateUrl: './exam-import.component.html',
  styleUrls: ['./exam-import.component.scss']
})
export class ExamImportComponent implements OnInit {
  form: FormGroup;
  error: string;
  uploadResponse: string;

  constructor(private myservice:MyserviceService,private http: HttpClient, private toa: ToastrService,private formBuilder: FormBuilder, private router: Router) {
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
   }

  ngOnInit() {
    this.form = this.formBuilder.group({
      avatar: ['']
    });
  }
  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('avatar').setValue(file);
    }
  }
  saveExam() {
    const permission = sessionStorage.getItem('currentPermission');
    const httpHeader = new HttpHeaders({ permission});

    console.log(this.form.value);
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.http.post<ResultObject>('http://localhost:65170/uploadExam/importExam', formData)
      .subscribe(
        (res) => {
          if (res.Success >= 1) {
            //confirm('Import Success');
            this.toa.success('Import success', '')
            console.log(res);
            this.router.navigate(['exam']);          
          } else {
            this.toa.error('Import Fail!  ' + res.Message);
            console.log(res);
          }
        },
        (err) => this.error = err,
      );
  
  }
}
