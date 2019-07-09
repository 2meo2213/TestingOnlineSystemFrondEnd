import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSemesterExamReportComponent } from './manager-semester-exam-report.component';

describe('ManagerSemesterExamReportComponent', () => {
  let component: ManagerSemesterExamReportComponent;
  let fixture: ComponentFixture<ManagerSemesterExamReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSemesterExamReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSemesterExamReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
