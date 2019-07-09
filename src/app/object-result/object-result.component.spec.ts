import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectResultComponent } from './object-result.component';

describe('ObjectResultComponent', () => {
  let component: ObjectResultComponent;
  let fixture: ComponentFixture<ObjectResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObjectResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
