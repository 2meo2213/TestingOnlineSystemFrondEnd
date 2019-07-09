import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailQuestionComponent } from './detail-question.component';

describe('DetailQuestionComponent', () => {
  let component: DetailQuestionComponent;
  let fixture: ComponentFixture<DetailQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
