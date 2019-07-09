import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSemesterExamTestComponent } from './manager-semester-exam-test.component';

describe('ManagerSemesterExamTestComponent', () => {
  let component: ManagerSemesterExamTestComponent;
  let fixture: ComponentFixture<ManagerSemesterExamTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSemesterExamTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSemesterExamTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
