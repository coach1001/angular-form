import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgStepperComponent } from './fg-stepper.component';

describe('FgStepperComponent', () => {
  let component: FgStepperComponent;
  let fixture: ComponentFixture<FgStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
