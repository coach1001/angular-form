import { TestBed, async, inject } from '@angular/core/testing';

import { ModuleGuard } from './module.guard';

describe('ModuleGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModuleGuard]
    });
  });

  it('should ...', inject([ModuleGuard], (guard: ModuleGuard) => {
    expect(guard).toBeTruthy();
  }));
});
