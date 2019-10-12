import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgControlComponent } from './fg-control.component';

describe('FgControlComponent', () => {
  let component: FgControlComponent;
  let fixture: ComponentFixture<FgControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
