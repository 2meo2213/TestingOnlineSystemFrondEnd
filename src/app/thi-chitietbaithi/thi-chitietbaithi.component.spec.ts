import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiChitietbaithiComponent } from './thi-chitietbaithi.component';

describe('ThiChitietbaithiComponent', () => {
  let component: ThiChitietbaithiComponent;
  let fixture: ComponentFixture<ThiChitietbaithiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThiChitietbaithiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThiChitietbaithiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
