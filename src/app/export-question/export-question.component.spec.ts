import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportQuestionComponent } from './export-question.component';

describe('ExportQuestionComponent', () => {
  let component: ExportQuestionComponent;
  let fixture: ComponentFixture<ExportQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
