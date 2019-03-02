/*
Servisin görevi https://jsonplaceholder.typicode.com/posts adresinden
dummy veri çekmek ve bunu bir Observable nesne olarak sunmak.
*/
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HttpClient nesnesini içeriye constructor üzerinden enjekte edeceğiz
import { Observable } from 'rxjs'; //RxJS kütüphanesinden Observable tipini kullanıyoruz

/*
JSON servisinden dönen öğeleri ifade eden arayüz tanımı.
Post tipini temsilen bazı alanlar içeriyor.
*/
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})

/*
DummyService'i üretmek için komut satırından 
ng g service dummy
komutunu kullandık
*/
export class DummyService {

  // Constructor bazlı dependency injection
  constructor(private httpClient: HttpClient) { }

  /* 
    get metodu Observable tipte bir koleksiyon döndürür 
  */
  get(): Observable<Post[]> {
    var url = "https://jsonplaceholder.typicode.com/posts";
    /*
      url ile belirtilen adrese get talebi gönderiyor
      ve içeriğini Post dizisi olarak alıp
      Observable nesnesiyle geriye dönüyoruz
    */
    return <Observable<Post[]>>this.httpClient.get(url);
  }
}
