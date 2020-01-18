import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDuiContainerComponent } from './account-dui-container.component';

describe('AccountDuiContainerComponent', () => {
  let component: AccountDuiContainerComponent;
  let fixture: ComponentFixture<AccountDuiContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDuiContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDuiContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
