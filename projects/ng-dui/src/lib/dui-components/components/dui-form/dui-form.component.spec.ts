import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiFormComponent } from './dui-form.component';

describe('DuiFormComponent', () => {
  let component: DuiFormComponent;
  let fixture: ComponentFixture<DuiFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
