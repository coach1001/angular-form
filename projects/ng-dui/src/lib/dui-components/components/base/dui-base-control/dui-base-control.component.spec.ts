import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiBaseControlComponent } from './dui-base-control.component';

describe('DuiBaseControlComponent', () => {
  let component: DuiBaseControlComponent;
  let fixture: ComponentFixture<DuiBaseControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiBaseControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiBaseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
