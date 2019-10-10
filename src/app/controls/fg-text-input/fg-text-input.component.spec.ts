import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgTextInputComponent } from './fg-text-input.component';

describe('FgTextInputComponent', () => {
  let component: FgTextInputComponent;
  let fixture: ComponentFixture<FgTextInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgTextInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
