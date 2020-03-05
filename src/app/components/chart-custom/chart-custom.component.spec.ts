import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCustomComponent } from './chart-custom.component';

describe('ChartCustomComponent', () => {
  let component: ChartCustomComponent;
  let fixture: ComponentFixture<ChartCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
