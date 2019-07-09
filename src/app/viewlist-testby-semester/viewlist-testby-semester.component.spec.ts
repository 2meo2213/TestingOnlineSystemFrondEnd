import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewlistTestbySemesterComponent } from './viewlist-testby-semester.component';

describe('ViewlistTestbySemesterComponent', () => {
  let component: ViewlistTestbySemesterComponent;
  let fixture: ComponentFixture<ViewlistTestbySemesterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewlistTestbySemesterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewlistTestbySemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
