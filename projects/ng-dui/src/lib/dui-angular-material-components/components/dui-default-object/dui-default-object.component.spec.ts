import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiDefaultObjectComponent } from './dui-default-object.component';

describe('DuiDefaultObjectComponent', () => {
  let component: DuiDefaultObjectComponent;
  let fixture: ComponentFixture<DuiDefaultObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiDefaultObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiDefaultObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
