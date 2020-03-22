import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultSelectComponent } from './dui-default-select.component';

describe('DuiDefaultSelectComponent', () => {
  let component: DuiDefaultSelectComponent;
  let fixture: ComponentFixture<DuiDefaultSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
