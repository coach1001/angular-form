import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuiBaseObjectComponent } from './dui-base-object.component';

describe('DuiBaseObjectComponent', () => {
  let component: DuiBaseObjectComponent;
  let fixture: ComponentFixture<DuiBaseObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuiBaseObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuiBaseObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
