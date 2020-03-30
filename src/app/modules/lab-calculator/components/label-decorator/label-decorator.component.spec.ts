import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelDecoratorComponent } from './label-decorator.component';

describe('LabelDecoratorComponent', () => {
  let component: LabelDecoratorComponent;
  let fixture: ComponentFixture<LabelDecoratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelDecoratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelDecoratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
