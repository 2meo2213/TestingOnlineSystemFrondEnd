import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleActionAddComponent } from './role-action-add.component';

describe('RoleActionAddComponent', () => {
  let component: RoleActionAddComponent;
  let fixture: ComponentFixture<RoleActionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleActionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleActionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
