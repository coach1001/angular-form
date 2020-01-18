import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiBaseArrayComponent } from './dui-base-array.component';

describe('DuiBaseArrayComponent', () => {
  let component: DuiBaseArrayComponent;
  let fixture: ComponentFixture<DuiBaseArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiBaseArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiBaseArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
