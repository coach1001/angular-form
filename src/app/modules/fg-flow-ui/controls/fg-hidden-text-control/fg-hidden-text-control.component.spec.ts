import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgHiddenTextControlComponent } from './fg-hidden-text-control.component';

describe('FgHiddenTextControlComponent', () => {
  let component: FgHiddenTextControlComponent;
  let fixture: ComponentFixture<FgHiddenTextControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgHiddenTextControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgHiddenTextControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
