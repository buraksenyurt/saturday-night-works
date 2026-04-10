import { TestBed } from '@angular/core/testing';
import { ArticleService } from './article.service';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

describe('ArticleService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: Socket, useValue: { fromEvent: () => of(null), emit: () => {} } },
    ],
  }));

  it('should be created', () => {
    const service = TestBed.inject(ArticleService);
    expect(service).toBeTruthy();
  });
});
