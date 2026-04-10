import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { DummyService } from './dummy.service';
import { Post } from './dummy.service';
import { of } from 'rxjs';
import { firstValueFrom } from 'rxjs';

describe('AppComponent', () => {
  const mockPost: Post = { userId: 1, id: 1, title: 'Test Title', body: 'Test Body' };
  const mockDummyService = { get: () => of([mockPost]) };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: DummyService, useValue: mockDummyService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dummy Posts'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Dummy Posts');
  });

  it('should expose posts as an observable', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    const app = fixture.componentInstance;
    const posts = await firstValueFrom(app.posts$);
    expect(posts.length).toBe(1);
  });

  it('should render fetched posts', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Title');
    expect(compiled.textContent).toContain('Test Body');
  });
});
