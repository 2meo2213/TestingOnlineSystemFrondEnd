import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesstformComponent } from './tesstform.component';

describe('TesstformComponent', () => {
  let component: TesstformComponent;
  let fixture: ComponentFixture<TesstformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesstformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesstformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
