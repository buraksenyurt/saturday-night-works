import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize with a random city and weather', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.currentWeather.length).toBeGreaterThan(0);
    expect(app.computersLocation.length).toBeGreaterThan(0);
  });

  it('should set guessIsCorrect to true when guess matches city', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.playersGuess = app.computersLocation;
    app.checkMyGuess();
    expect(app.guessIsCorrect).toBeTrue();
  });

  it('should set guessIsCorrect to false when guess is wrong', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.playersGuess = 'Yanlış Şehir';
    app.checkMyGuess();
    expect(app.guessIsCorrect).toBeFalse();
  });

  it('should reset state when fullThrottle is called', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.guessIsCorrect = true;
    app.fullThrottle();
    expect(app.guessIsCorrect).toBeFalse();
    expect(app.playersGuess).toBe('');
  });
});
