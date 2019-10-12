import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgGroupComponent } from './fg-group.component';

describe('FgGroupComponent', () => {
  let component: FgGroupComponent;
  let fixture: ComponentFixture<FgGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
