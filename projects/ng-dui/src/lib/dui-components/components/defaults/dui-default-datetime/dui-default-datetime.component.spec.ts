import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultDatetimeComponent } from './dui-default-datetime.component';

describe('DuiDefaultDatetimeComponent', () => {
  let component: DuiDefaultDatetimeComponent;
  let fixture: ComponentFixture<DuiDefaultDatetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultDatetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultDatetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
