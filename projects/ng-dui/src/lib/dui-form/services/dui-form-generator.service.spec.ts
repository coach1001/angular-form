import { TestBed } from '@angular/core/testing';

import { DuiFormGeneratorService } from './dui-form-generator.service';

describe('DuiFormGeneratorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuiFormGeneratorService = TestBed.get(DuiFormGeneratorService);
    expect(service).toBeTruthy();
  });
});
