import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultHideableTextComponent } from './dui-default-hideable-text.component';

describe('DuiDefaultHideableTextComponent', () => {
  let component: DuiDefaultHideableTextComponent;
  let fixture: ComponentFixture<DuiDefaultHideableTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultHideableTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultHideableTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
