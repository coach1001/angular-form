import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgBaseElementComponent } from './fg-base-element.component';

describe('FgBaseElementComponent', () => {
  let component: FgBaseElementComponent;
  let fixture: ComponentFixture<FgBaseElementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgBaseElementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgBaseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
