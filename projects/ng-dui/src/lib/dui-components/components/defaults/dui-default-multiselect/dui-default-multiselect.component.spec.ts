import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultMultiselectComponent } from './dui-default-multiselect.component';

describe('DuiDefaultMultiselectComponent', () => {
  let component: DuiDefaultMultiselectComponent;
  let fixture: ComponentFixture<DuiDefaultMultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultMultiselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultMultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
