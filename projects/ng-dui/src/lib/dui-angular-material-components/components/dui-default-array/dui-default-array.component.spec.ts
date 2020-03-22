import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultArrayComponent } from './dui-default-array.component';

describe('DuiDefaultArrayComponent', () => {
  let component: DuiDefaultArrayComponent;
  let fixture: ComponentFixture<DuiDefaultArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
