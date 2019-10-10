import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgArrayComponent } from './fg-array.component';

describe('FgArrayComponent', () => {
  let component: FgArrayComponent;
  let fixture: ComponentFixture<FgArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
