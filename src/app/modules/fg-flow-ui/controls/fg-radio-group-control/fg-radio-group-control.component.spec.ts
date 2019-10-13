import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgRadioGroupControlComponent } from './fg-radio-group-control.component';

describe('FgRadioGroupControlComponent', () => {
  let component: FgRadioGroupControlComponent;
  let fixture: ComponentFixture<FgRadioGroupControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgRadioGroupControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgRadioGroupControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
