import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamDetailQuestionComponent } from './exam-detail-question.component';

describe('ExamDetailQuestionComponent', () => {
  let component: ExamDetailQuestionComponent;
  let fixture: ComponentFixture<ExamDetailQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamDetailQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamDetailQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
