import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDynamicComponent } from './dui-dynamic.component';

describe('DuiDynamicComponent', () => {
  let component: DuiDynamicComponent;
  let fixture: ComponentFixture<DuiDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
