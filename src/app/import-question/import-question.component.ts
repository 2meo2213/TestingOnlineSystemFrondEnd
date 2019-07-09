import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResultObject } from '../result-object';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-import-question',
  templateUrl: './import-question.component.html',
  styleUrls: ['./import-question.component.scss']
})
export class ImportQuestionComponent implements OnInit {
  form: FormGroup;
  error: string;
  uploadResponse: string;

  constructor(private http: HttpClient,private myservice:MyserviceService, private toa: ToastrService, private formBuilder: FormBuilder, private router: Router) {
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
  saveQuestion() {
    debugger;
    const permission = sessionStorage.getItem('currentPermission');
    const httpHeader = new HttpHeaders({ permission});

    console.log(this.form.value);
    const formData = new FormData();
    formData.append('file', this.form.get('avatar').value);

    this.http.post<ResultObject>('http://localhost:65170/upload/importquestion', formData, { headers: httpHeader })
      .subscribe(
        (res) => {
          if (res.Success >= 1) {
            //confirm('Import Success');
            this.toa.success('Import success', '')
          } else {
            this.toa.error('Import Fail!  ' + res.Message);
          }
        },
        (err) => this.error = err,
      );
    this.router.navigate(['question']);
  }

}
