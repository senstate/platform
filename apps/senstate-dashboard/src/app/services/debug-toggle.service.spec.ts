import { TestBed } from '@angular/core/testing';

import { DebugToggleService } from './debug-toggle.service';

describe('DebugToggleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DebugToggleService = TestBed.get(DebugToggleService);
    expect(service).toBeTruthy();
  });
});
