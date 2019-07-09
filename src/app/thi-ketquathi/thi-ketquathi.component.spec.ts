import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThiKetquathiComponent } from './thi-ketquathi.component';

describe('ThiKetquathiComponent', () => {
  let component: ThiKetquathiComponent;
  let fixture: ComponentFixture<ThiKetquathiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThiKetquathiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThiKetquathiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
