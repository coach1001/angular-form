import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultBooleanComponent } from './dui-default-boolean.component';

describe('DuiDefaultBooleanComponent', () => {
  let component: DuiDefaultBooleanComponent;
  let fixture: ComponentFixture<DuiDefaultBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultBooleanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
