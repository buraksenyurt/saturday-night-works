import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  // Socket sunucusuna event fırlatıp yakalayacağımız için
import { Article } from '../app/article'; //Article tipini kullanacağımız için

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  /*
   Socket sunucusundan yayınlanacak ready ve warnEveryOne isimli olaylar için kullanacağımız özellikler
   Sunucu warnEveryOne ile tüm istemcilere makale listesini string array olarak gönderiyordu.
   Doküman ekleme, güncelleme ve tek birisini çekme işlemlerinde de web sunucusu ready olayını tetikliyordu.
   fromEvent dönüşleri Observable tiptedir. Yani değişiklikler otomatik olarak abonelerine yansıyacaktır. 
*/
  currentArticle = this.socket.fromEvent<Article>('ready');
  allOfThem = this.socket.fromEvent<string[]>('warnEveryOne');

  constructor(private socket: Socket) { } //Constructor injection ile Socket modülünü yükledik

  /*
  Boş bir doküman üretmek için kullanılıyor.
  emit metodu add olayını tetiklemekte. Sunucuya ikinci parametrede belirtilen içerik gönderiliyor.

  */
  add() {
    let randomArticleName = Math.floor(Math.random() * 1000 + 1).toString();
    this.socket.emit('add', {id: randomArticleName,content:'' });
  }

  /*
  makale içeriğinin güncellenmesi halinde sunucu tarafına update olayı basılır
  */
  update(article:Article){
    this.socket.emit('update',article);
  }

  /*
  id değerine göre bir makaleyi almak için get olayını fırlatıyor.
  */
  get(id:string){
    this.socket.emit('get',id);
  }

}
