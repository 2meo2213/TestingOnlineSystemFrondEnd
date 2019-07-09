import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionExamListComponent } from './question-exam-list.component';

describe('QuestionExamListComponent', () => {
  let component: QuestionExamListComponent;
  let fixture: ComponentFixture<QuestionExamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionExamListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionExamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
