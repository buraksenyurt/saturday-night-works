import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DummyService } from './dummy.service';
import { Post } from './dummy.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgFor, MatToolbarModule, MatCardModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'Dummy Posts';
  posts: Array<Post> = [];

  constructor(private dummyService: DummyService) {

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
