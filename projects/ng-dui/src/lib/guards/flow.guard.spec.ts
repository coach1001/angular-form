import { TestBed, async, inject } from '@angular/core/testing';

import { FlowGuard } from './flow.guard';

describe('FlowGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FlowGuard]
    });
  });

  it('should ...', inject([FlowGuard], (guard: FlowGuard) => {
    expect(guard).toBeTruthy();
  }));
});
