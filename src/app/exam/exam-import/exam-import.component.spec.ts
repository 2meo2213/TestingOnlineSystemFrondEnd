import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamImportComponent } from './exam-import.component';

describe('ExamImportComponent', () => {
  let component: ExamImportComponent;
  let fixture: ComponentFixture<ExamImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
