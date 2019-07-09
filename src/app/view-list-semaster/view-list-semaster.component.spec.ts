import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewListSemasterComponent } from './view-list-semaster.component';

describe('ViewListSemasterComponent', () => {
  let component: ViewListSemasterComponent;
  let fixture: ComponentFixture<ViewListSemasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewListSemasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewListSemasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
