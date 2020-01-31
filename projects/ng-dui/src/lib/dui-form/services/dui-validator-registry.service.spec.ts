import { TestBed } from '@angular/core/testing';

import { DuiValidatorRegistryService } from './dui-validator-registry.service';

describe('DuiValidatorRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuiValidatorRegistryService = TestBed.get(DuiValidatorRegistryService);
    expect(service).toBeTruthy();
  });
});
