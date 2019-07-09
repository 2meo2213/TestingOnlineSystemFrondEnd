import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListSemastertotestComponent } from './view-list-semastertotest.component';

describe('ViewListSemastertotestComponent', () => {
  let component: ViewListSemastertotestComponent;
  let fixture: ComponentFixture<ViewListSemastertotestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListSemastertotestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListSemastertotestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
