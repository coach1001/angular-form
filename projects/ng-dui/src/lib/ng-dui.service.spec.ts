import { TestBed } from '@angular/core/testing';

import { NgDuiService } from './ng-dui.service';

describe('NgDuiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgDuiService = TestBed.get(NgDuiService);
    expect(service).toBeTruthy();
  });
});
