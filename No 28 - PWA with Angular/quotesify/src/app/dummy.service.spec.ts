import { TestBed } from '@angular/core/testing';

import { DummyService } from './dummy.service';

describe('DummyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DummyService = TestBed.get(DummyService);
    expect(service).toBeTruthy();
  });
});
