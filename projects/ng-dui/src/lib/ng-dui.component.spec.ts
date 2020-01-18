import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgDuiComponent } from './ng-dui.component';

describe('NgDuiComponent', () => {
  let component: NgDuiComponent;
  let fixture: ComponentFixture<NgDuiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgDuiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgDuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
