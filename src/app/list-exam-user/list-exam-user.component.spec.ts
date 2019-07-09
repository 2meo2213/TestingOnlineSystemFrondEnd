import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListExamUserComponent } from './list-exam-user.component';

describe('ListExamUserComponent', () => {
  let component: ListExamUserComponent;
  let fixture: ComponentFixture<ListExamUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListExamUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListExamUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
