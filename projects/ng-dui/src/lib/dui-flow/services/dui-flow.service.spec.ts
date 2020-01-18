import { TestBed } from '@angular/core/testing';

import { DuiFlowService } from './dui-flow.service';

describe('DuiFlowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DuiFlowService = TestBed.get(DuiFlowService);
    expect(service).toBeTruthy();
  });
});
