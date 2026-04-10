import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Socket } from 'ngx-socket-io';
import { of } from 'rxjs';

const mockSocket = { fromEvent: () => of(null), emit: () => {} };

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: Socket, useValue: mockSocket },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'authorApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('authorApp');
  });
});
  });
});
