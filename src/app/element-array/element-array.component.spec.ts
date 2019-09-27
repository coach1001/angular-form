import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementArrayComponent } from './element-array.component';

describe('ElementArrayComponent', () => {
  let component: ElementArrayComponent;
  let fixture: ComponentFixture<ElementArrayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementArrayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
