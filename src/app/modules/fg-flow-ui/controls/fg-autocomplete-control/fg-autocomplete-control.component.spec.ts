import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgAutocompleteControlComponent } from './fg-autocomplete-control.component';

describe('FgAutocompleteControlComponent', () => {
  let component: FgAutocompleteControlComponent;
  let fixture: ComponentFixture<FgAutocompleteControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgAutocompleteControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgAutocompleteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
