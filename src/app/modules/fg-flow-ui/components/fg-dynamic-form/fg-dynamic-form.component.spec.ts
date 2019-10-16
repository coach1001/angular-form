import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgDynamicFormComponent } from './fg-dynamic-form.component';

describe('FgDynamicFormComponent', () => {
  let component: FgDynamicFormComponent;
  let fixture: ComponentFixture<FgDynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgDynamicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
