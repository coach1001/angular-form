import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultNumberComponent } from './dui-default-number.component';

describe('DuiDefaultNumberComponent', () => {
  let component: DuiDefaultNumberComponent;
  let fixture: ComponentFixture<DuiDefaultNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
