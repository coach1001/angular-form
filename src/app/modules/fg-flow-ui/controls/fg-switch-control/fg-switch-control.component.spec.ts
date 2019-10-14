import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgSwitchControlComponent } from './fg-switch-control.component';

describe('FgSwitchControlComponent', () => {
  let component: FgSwitchControlComponent;
  let fixture: ComponentFixture<FgSwitchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgSwitchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgSwitchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
