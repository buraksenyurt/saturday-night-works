import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Şimdi Hangi Şehirdeyim?';
  currentWeather: string; // Güncel hava durumu bilgisini tutan property
  computersLocation: string; //Bilgisayarın yerini tutacak property
  playersGuess: string; // Oyuncunun tahminini tutacak property
  guessIsCorrect: boolean; // Tahminin doğru olup olmadığını tuttuğumuz property
  hint:string; // Tahmini kolaylaştırmak için verdiğimiz ipucunu tutan property

  // Örnek veri dizileri. 
  // TODO: Daha uygun bir key-value dizisi bulunabilir mi?

  airConditions = ['güneşli', 'yağmurlu', 'karlı', 'sisli'];
  cities = [
    ['Barcelona', 'Madrid', 'Lima', 'Rio', 'Miami', 'Sydney', 'Antalya'],
    ['Prag', 'Paris', 'Tokyo', 'Dublin', 'Londra', 'Pekin'],
    ['Moskova', 'Montreal', 'Boston', 'Ağrı'],
    ['London', 'Glasgow', 'Mexico City', 'Frankfurt', 'İstanbul']
  ];

  /*
  Uygulama button bağımsız ilk başlatıldığında da hava tahmini yapılsın ve şehir tutulsun.
  */
  constructor() {
    this.hint = "";
    this.computersLocation="";
    this.currentWeather="";
    this.fullThrottle();
  }
  /*
  Bilgisayar için rastgele hava durumu üreten fonksiyon
  Random fonksiyonundan yararlanıp uygun aralıklarda rastgele sayı üretir
  ve buna göre rastgele bir şehir tutar.
  */
  fullThrottle() {
    // hava durumlarını tutan dizinin boyutuna göre rastgele sayı ürettik
    var rnd1 = Math.floor((Math.random() * this.airConditions.length));
    // rastgele bir hava durumu bilgisi aldık
    this.currentWeather = this.airConditions[rnd1];

    // şehirlerin tutulduğu dizide, hava durumu bilgisine uyan (örnekte indeks sırası) dizinin uzunluğunu aldık
    var arrayLength = this.cities[rnd1].length;
    // uzunluğuna göre rastgele bir sayı ürettik
    var rnd2 = Math.floor((Math.random() * arrayLength));
    // üretilen rastgele sayıya göre diziden bir şehir adı aldık
    this.computersLocation = this.cities[rnd1][rnd2];

    this.hint="Baş harfi "+this.computersLocation[0];

    console.log(this.computersLocation); // Şşşşttt. Kimseye söylemeyin. F12'ye basınca ışınlanan şehri görebilirsiniz.
  }

  /*
  Oyuncunun tahminini kontrol eden fonksiyon
  */
  checkMyGuess() {

    if (this.playersGuess == this.computersLocation)
      this.guessIsCorrect = true;
    else
      this.guessIsCorrect = false;
  }
}
