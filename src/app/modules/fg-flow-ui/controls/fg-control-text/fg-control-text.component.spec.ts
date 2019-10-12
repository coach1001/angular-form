import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FgControlTextComponent } from './fg-control-text.component';

describe('FgControlTextComponent', () => {
  let component: FgControlTextComponent;
  let fixture: ComponentFixture<FgControlTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FgControlTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FgControlTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
