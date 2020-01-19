import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DuiStepperComponent } from './dui-stepper.component';

describe('DuiStepperComponent', () => {
  let component: DuiStepperComponent;
  let fixture: ComponentFixture<DuiStepperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
