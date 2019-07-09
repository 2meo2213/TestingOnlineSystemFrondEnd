import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListQuestionComponent } from './view-list-question.component';

describe('ViewListQuestionComponent', () => {
  let component: ViewListQuestionComponent;
  let fixture: ComponentFixture<ViewListQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
