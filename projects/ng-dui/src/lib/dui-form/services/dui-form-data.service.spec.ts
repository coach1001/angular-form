import { TestBed } from '@angular/core/testing';

import { DuiFormDataService } from './dui-form-data.service';

describe('DuiFormDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuiFormDataService = TestBed.get(DuiFormDataService);
    expect(service).toBeTruthy();
  });
});
