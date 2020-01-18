import { TestBed } from '@angular/core/testing';

import { DuiFlowBackendService } from './dui-flow-backend.service';

describe('DuiFlowBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuiFlowBackendService = TestBed.get(DuiFlowBackendService);
    expect(service).toBeTruthy();
  });
});
