import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSemesterExamExamsComponent } from './manager-semester-exam-exams.component';

describe('ManagerSemesterExamExamsComponent', () => {
  let component: ManagerSemesterExamExamsComponent;
  let fixture: ComponentFixture<ManagerSemesterExamExamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSemesterExamExamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSemesterExamExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
