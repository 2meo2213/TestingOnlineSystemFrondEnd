import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailExamCustomerComponent } from './detail-exam-customer.component';

describe('DetailExamCustomerComponent', () => {
  let component: DetailExamCustomerComponent;
  let fixture: ComponentFixture<DetailExamCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailExamCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailExamCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
