import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { DummyService } from './dummy.service';

describe('DummyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [provideHttpClient()],
  }));

  it('should be created', () => {
    const service = TestBed.inject(DummyService);
    expect(service).toBeTruthy();
  });
});
