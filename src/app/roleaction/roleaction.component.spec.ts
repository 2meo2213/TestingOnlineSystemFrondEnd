import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleactionComponent } from './roleaction.component';

describe('RoleactionComponent', () => {
  let component: RoleactionComponent;
  let fixture: ComponentFixture<RoleactionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleactionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
