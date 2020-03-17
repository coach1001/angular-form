import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabCalculatorContainerComponent } from './lab-calculator-container.component';

describe('AccountDuiContainerComponent', () => {
  let component: LabCalculatorContainerComponent;
  let fixture: ComponentFixture<LabCalculatorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabCalculatorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabCalculatorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
