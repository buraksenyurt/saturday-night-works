import { Component, OnInit } from '@angular/core';
import {DummyService} from './dummy.service'; // yeni eklediğimiz servisi kullanacağımızı belirtiyoruz
import {Post} from './dummy.service'; //ki Post arayüz tipinide oradan export etmiştik

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// AppComponent, OnInit metodunu uygulamalı
export class AppComponent implements OnInit {
  title = 'Dummy Posts';
  posts: Array<Post>; // çekilen Post verilerini saklamak için kullanacağımız dizi

  constructor(private dummyService:DummyService){

  }

  /*
  OnInit, Angular bileşeninin yaşam döngüsünde çalışan metodlardan birisi.
  Component oluşturulurken devreye girip ilgili servisten veriyi çeken bir 
  işlevi yürütecek şekilde programlandı.

  OnInit AppComponent bileşeni oluşurken bir seferliğine çağrılır.
  */
  ngOnInit(){
    /*
    Constructor'dan enjekte edilen DummyService örneğini kullanarak
    get metoduna başvuruyor ve Post dizisini çekiyoruz.

    DummyService servisindeki get metodu Observable bir nesne döndürüyor.
    Burada ona abone(subscribe) oluyoruz. Asenkron çalışma durumu söz konusu
    olduğunda servis ilgili veriyi çektiğinde kendisine abone olanları da bilgilendirecektir.
    Yani çekilen Post dizisindeki değişim(bu senaryoda servisten alınması) component'e
    bildirilmiş olacaktır. 
    
    */
    this.dummyService.get().subscribe((data:Array<Post>)=>{
      this.posts=data;
    },(err)=>{
      console.log(err);
    });
  }
}
