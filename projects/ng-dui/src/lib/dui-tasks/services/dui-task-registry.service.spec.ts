import { TestBed } from '@angular/core/testing';

import { DuiTaskRegistryService } from './dui-task-registry.service';

describe('DuiTaskRegistryService', () => {
  let service: DuiTaskRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DuiTaskRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
