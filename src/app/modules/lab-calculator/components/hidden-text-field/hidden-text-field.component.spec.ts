import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HiddenTextFieldComponent } from './hidden-text-field.component';

describe('HiddenTextFieldComponent', () => {
  let component: HiddenTextFieldComponent;
  let fixture: ComponentFixture<HiddenTextFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HiddenTextFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HiddenTextFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
