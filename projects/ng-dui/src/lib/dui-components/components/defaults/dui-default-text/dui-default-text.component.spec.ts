import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultTextComponent } from './dui-default-text.component';

describe('DuiDefaultTextComponent', () => {
  let component: DuiDefaultTextComponent;
  let fixture: ComponentFixture<DuiDefaultTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
