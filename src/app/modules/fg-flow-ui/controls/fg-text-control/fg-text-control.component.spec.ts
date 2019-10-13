import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgTextControlComponent } from './fg-text-control.component';

describe('FgTextControlComponent', () => {
  let component: FgTextControlComponent;
  let fixture: ComponentFixture<FgTextControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgTextControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgTextControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
