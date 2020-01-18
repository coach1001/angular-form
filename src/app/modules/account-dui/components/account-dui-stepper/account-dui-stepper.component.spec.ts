import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDuiStepperComponent } from './account-dui-stepper.component';

describe('AccountDuiStepperComponent', () => {
  let component: AccountDuiStepperComponent;
  let fixture: ComponentFixture<AccountDuiStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDuiStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDuiStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
