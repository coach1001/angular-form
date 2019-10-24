import { TestBed } from '@angular/core/testing';

import { FlowBackendService } from './flow-backend.service';

describe('FlowBackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlowBackendService = TestBed.get(FlowBackendService);
    expect(service).toBeTruthy();
  });
});
