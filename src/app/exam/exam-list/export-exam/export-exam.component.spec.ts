import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportExamComponent } from './export-exam.component';

describe('ExportExamComponent', () => {
  let component: ExportExamComponent;
  let fixture: ComponentFixture<ExportExamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportExamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
