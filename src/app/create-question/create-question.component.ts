import { Component, OnInit } from '@angular/core';
import * as ClassicEditorBuild from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Question } from '../question';
import { Router } from '@angular/router';
import { ResultObject } from '../result-object';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Category } from '../ICategory';
import { Tag } from '../Tag';
import { http } from '../http-header';
import { ToastrService } from 'ngx-toastr';
import { MyserviceService } from '../myservice.service';




@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent implements OnInit {
  public Editor = ClassicEditorBuild;
  public componentEvents: string[] = [];
  Questions: Question[] = [];

  EditorQuestion: { getData; setData; };
  answer: FormGroup;
  answers: FormArray;
  tagsFormApi: Tag[];
  categoriesFormApi: Category[];
  ctForm: FormGroup;
  //  submitted = false;

  get QuestionType(): FormControl {
    return this.ctForm.get('QuestionType') as FormControl;
  }
  get Suggestion(): FormControl {
    return this.ctForm.get('Suggestion') as FormControl;
  }
  get Level(): FormControl {
    return this.ctForm.get('Level') as FormControl;
  }
  get Tags(): FormControl {
    return this.ctForm.get('Tags') as FormControl;
  }
  get Content(): FormControl {
    return this.ctForm.get('Content') as FormControl;
  }
  get ContentAnswer(): FormControl {
    return this.ctForm.get('ContentAnswer') as FormControl;
  }
  get Answers(): FormArray {
    return this.ctForm.get('Answers') as FormArray;
  }
  constructor(private http: HttpClient,private myservice:MyserviceService, private fb: FormBuilder, private router: Router,private toastr:ToastrService) { 
    this.router.events.subscribe((event) => {
      this.myservice.changeMessage('1');
   });
  }

  public onChange({ editor }: ChangeEvent) {
    const data = editor.getData();
    console.log(data);
  }
  createAnswer(): FormGroup {
    return this.fb.group({
      Media: '',
      Status: '1',
      Content: ['', [Validators.required]],
      IsTrue: '',
    });
  };
  addAnswer(): void {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.push(this.createAnswer());
  };
  removeAnswer(i) {
    this.answers = this.ctForm.get('Answers') as FormArray;
    this.answers.removeAt(i);
  }

  getApiTags() {
    this.http.get<string>('http://localhost:65170/api/tag/',{ headers: http() }).subscribe(value => {
      this.tagsFormApi = JSON.parse(value);
    });
  }
  getApiCategories() {
    this.http.get<string>('http://localhost:65170/api/category/',{ headers: http() }).subscribe(value => {
      this.categoriesFormApi = JSON.parse(value);
    });
  }
  saveQuestion() {
    this.ctForm.value.Content= this.EditorQuestion.getData();
    console.log(this.ctForm.value);
    debugger;
    console.log(this.ctForm.value.Content)
    if (this.ctForm.valid) {
      let valueQuestion = this.ctForm.value;
      const length = valueQuestion.TagId.length;
      let idTags = valueQuestion.TagId;
      let arrTags = [];
      for (let i = 0; i < length; i++) {
        console.log(idTags[i].Id);
        let tag = this.tagsFormApi.filter(s => s.Id == idTags[i]);
        arrTags = [...arrTags, ...tag];
      }
      valueQuestion.Tags = arrTags;
      valueQuestion.Category = this.categoriesFormApi.filter(s  => s.Id == valueQuestion.Category.Id);
      valueQuestion.Category = valueQuestion.Category.length > 0 ? valueQuestion.Category[0] : {};
      valueQuestion.Answers.map(s => s.IsTrue = s.IsTrue ? 1 : 0);
      console.log(valueQuestion);

      this.http.post<string>('http://localhost:65170/api/question/', JSON.stringify(valueQuestion), { headers: http() })
        .subscribe({
          next: (res) => {
            const result: ResultObject = JSON.parse(res);
            this.http.get<string>('http://localhost:65170/api/question/',{ headers: http() }).subscribe(value => {
              this.Questions = JSON.parse(value);
            });
            if (result.Success >= 1) {
              //confirm("Create success");
              this.toastr.success('Create success!', '');
            } else {
              //confirm("Create Fail!");
              this.toastr.error('Create Fail!', '');
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
        Category: this.fb.group({
          Id: '2',
        }),
        // Media: '',
        QuestionType: '1',
        Suggestion: '',
        Level: '1',
        Content: '',
        TagId: '',
        Answers: this.fb.array(
          [
            this.createAnswer()
          ]),
      }
    );
    this.initCkeditor(this.Content, '#creater-question');
  };

  initCkeditor(data, selector) {

    ClassicEditorBuild.create(document.querySelector(selector), {
      ckfinder: {
        uploadUrl: 'http://localhost:65170/Upload/UploadCkeditor',
      },
    }).then(newEditor => {
      this.EditorQuestion = newEditor;
      this.EditorQuestion.setData(data);
    })
      .catch(error => {
        console.log("error");
      });
    ;

  }
}
