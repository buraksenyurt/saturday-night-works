import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Şimdi Hangi Şehirdeyim?';
  currentWeather = '';
  computersLocation = '';
  playersGuess = '';
  guessIsCorrect = false;
  hasGuessed = false;
  hint = '';

  airConditions = ['güneşli', 'yağmurlu', 'karlı', 'sisli'];
  cities = [
    ['Barcelona', 'Madrid', 'Lima', 'Rio', 'Miami', 'Sydney', 'Antalya'],
    ['Prag', 'Paris', 'Tokyo', 'Dublin', 'Londra', 'Pekin'],
    ['Moskova', 'Montreal', 'Boston', 'Ağrı'],
    ['London', 'Glasgow', 'Mexico City', 'Frankfurt', 'İstanbul']
  ];

  constructor() {
    this.fullThrottle();
  }

  fullThrottle() {
    const rnd1 = Math.floor(Math.random() * this.airConditions.length);
    this.currentWeather = this.airConditions[rnd1];

    const cityGroup = this.cities[rnd1];
    const rnd2 = Math.floor(Math.random() * cityGroup.length);
    this.computersLocation = cityGroup[rnd2];

    this.hint = 'Baş harfi ' + this.computersLocation[0];
    this.guessIsCorrect = false;
    this.hasGuessed = false;
    this.playersGuess = '';
  }

  checkMyGuess() {
    this.hasGuessed = true;
    this.guessIsCorrect = this.playersGuess === this.computersLocation;
  }
}

