import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { Router, ActivatedRoute } from '@angular/router';
import { ResultObject } from '../result-object';
import { Tag } from '../Tag';
import { Category } from '../ICategory';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.scss']
})
////

export class EditQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  public componentEvents: string[] = [];
  Questions: Question[] = [];
  EditorQuestion: { getData; setData; };
  EditorAnswers: [];
  answer: FormGroup;
  answers: FormArray;
  tagsFormApi: Tag[];
  categoriesFormApi: Category[];
  ctForm: FormGroup;
  //  submitted = false;

  get Content(): FormControl {
    return this.ctForm.get('Content') as FormControl;
  }
  get ContentAnswer(): FormControl {
    return this.ctForm.get('ContentAnswer') as FormControl;
  }
  get Answers(): FormArray {
    return this.ctForm.get('Answers') as FormArray;
  }
  constructor(private http: HttpClient,private myservice:MyserviceService, private toastr: ToastrService, private fb: FormBuilder, private router: Router, private activedRoute: ActivatedRoute) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }

  createAnswer(): FormGroup {
    return this.fb.group({
      Id: '0',
      Media: '',
      Status: '',
      Content: ['', [Validators.required]],
      IsTrue: '',
    });
  }
  addAnswer(): void {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.push(this.createAnswer());
  }
  removeAnswer(i) {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.removeAt(i);
  }

  getApiTags() {
    this.http.get<string>('http://localhost:65170/api/tag/', { headers: http() }).subscribe(value => {
      this.tagsFormApi = JSON.parse(value);
    });
  }
  getApiCategories() {
    this.http.get<string>('http://localhost:65170/api/category/', { headers: http() }).subscribe(value => {
      this.categoriesFormApi = JSON.parse(value);
    });
  }

  saveQuestion() {

    if (this.ctForm.valid) {
      const valueQuestion = this.ctForm.value;
      const length = valueQuestion.TagId.length;
      const idTags = valueQuestion.TagId;
      let arrTags = [];
      for (let i = 0; i < length; i++) {
        console.log(idTags[i].Id);
        const tag = this.tagsFormApi.filter(s => s.Id == idTags[i]);
        arrTags = [...arrTags, ...tag];
      }
      valueQuestion.Tags = arrTags;
      valueQuestion.Category = this.categoriesFormApi.filter(s => s.Id == valueQuestion.CategoryId);
      valueQuestion.Category = valueQuestion.Category.length > 0 ? valueQuestion.Category[0] : {};
      valueQuestion.Answers.map(s => s.IsTrue = s.IsTrue ? 1 : 0);
      valueQuestion.Content = this.EditorQuestion.getData();
      console.log(valueQuestion);

      const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
      this.http.put<string>('http://localhost:65170/api/question/' + IdQuestion, JSON.stringify(valueQuestion), { headers: http() })
        .subscribe({
          next: (res) => {
            const result: ResultObject = JSON.parse(res);
            console.log(result);
            this.http.get<string>('http://localhost:65170/api/question/', { headers: http() }).subscribe(value => {
              this.Questions = JSON.parse(value);
            });
            if (result.Success >= 1) {
              //confirm('Update success!');
              this.toastr.success('Update success!', '');
            }
            else if (result.Success == -9) {
              this.toastr.error('Câu hỏi đang có trong đề thi ', '');
            }
            else {
              this.toastr.error('Update fail! ', '');

            }
            this.ctForm.reset();
          },

          error: (err) => {
            console.error(err);
          }

        });
    }
    this.router.navigate(['question']);
  }
  ngOnInit() {
    this.getApiTags();
    this.getApiCategories();

    this.ctForm = this.fb.group(
      {
        CategoryId: '',
        // Media: '',
        Type: '',
        Suggestion: '',
        Level: '',
        Content: ['', [Validators.required]],
        TagId: '',
        Answers: this.fb.array(
          [

          ]),
      });

    //////
    const IdQuestion = this.activedRoute.snapshot.paramMap.get('id')
    this.http.get<string>('http://localhost:65170/api/question/' + IdQuestion, { headers: http() }).subscribe(value => {

      const qs: Question = JSON.parse(value).Data;
      qs.CategoryId = qs.Category.Id;
      if (qs.Tags && qs.Tags.length > 0) {
        qs.Tags.forEach(s => qs.TagsId += ',' + s.Id);
      }

      if (qs.Answers && qs.Answers.length > 0) {
        for (let i = 0; i < qs.Answers.length; i++) {
          this.addAnswer();
          let ansF = this.ctForm.get('Answers') as FormArray;
          ansF.controls[i].patchValue(qs.Answers[i]);
        }
      }
      this.initCkeditor(qs.Content, '#editor-question');
      this.initCkeditor(qs.Content, '#editor-question1');
      this.ctForm.patchValue(qs);
    });

  }

  initCkeditor(data, selector) {

    ClassicEditorBuild.create(document.querySelector(selector), {
      ckfinder: {
        uploadUrl: 'http://localhost:65170/Upload/UploadCkeditor',
      },
    }).then(newEditor => {
      this.EditorQuestion = newEditor;
      this.EditorQuestion.setData(data);
    })
      // .catch(error => {
      //   console.error(error);
      // });
      ;

  }
}

