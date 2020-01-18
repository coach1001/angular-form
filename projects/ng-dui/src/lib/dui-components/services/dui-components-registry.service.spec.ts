import { TestBed } from '@angular/core/testing';

import { DuiComponentsRegistryService } from './dui-components-registry.service';

describe('DuiComponentsRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuiComponentsRegistryService = TestBed.get(DuiComponentsRegistryService);
    expect(service).toBeTruthy();
  });
});
