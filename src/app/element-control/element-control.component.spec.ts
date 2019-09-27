import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementControlComponent } from './element-control.component';

describe('ElementControlComponent', () => {
  let component: ElementControlComponent;
  let fixture: ComponentFixture<ElementControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
