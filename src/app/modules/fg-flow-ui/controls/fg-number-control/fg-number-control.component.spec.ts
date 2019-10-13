import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgNumberControlComponent } from './fg-number-control.component';

describe('FgNumberControlComponent', () => {
  let component: FgNumberControlComponent;
  let fixture: ComponentFixture<FgNumberControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgNumberControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgNumberControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
