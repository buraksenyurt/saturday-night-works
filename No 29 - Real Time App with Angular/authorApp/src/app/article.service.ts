import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';  // Socket sunucusuna event fırlatıp yakalayacağımız için
import { Article } from '../app/article'; //Article tipini kullanacağımız için

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  /*
   Socket sunucusundan yayınlanan ready ve warnEveryOne isimli olaylar için kullanacağımız özellikleri tanımlıyoruz.
   
   Sunucu tüm istemcilere makale listesini string array olarak gönderirken warnEveryOne olayını yayınlamakta.
   Doküman ekleme, güncelleme ve tek birisini çekme işlemlerine karşılık olarak da ready olayını yayınlıyordu.
   
   fromEvent dönüşleri Observable tiptedir. Yani değişiklikler otomatik olarak abonelerine yansıyacaktır. 
*/
  currentArticle = this.socket.fromEvent<Article>('ready');
  allOfThem = this.socket.fromEvent<string[]>('warnEveryone');

  constructor(private socket: Socket) { } //Constructor injection ile Socket modülünü yükledik

  /*
  Boş bir doküman üretmek için kullanılıyor.
  emit metodu add olayını tetiklemekte. 
  Sunucuya ikinci parametrede belirtilen içerik gönderiliyor.

  emit metodlarındaki ilk parametrelerdeki olaylar sunucunun dinlediği olaylardır.
  */
  add() {
    let randomArticleName = Math.floor(Math.random() * 1000 + 1).toString();
    this.socket.emit('add', {id: randomArticleName,content:'' });
    // console.log(this.allOfThem.forEach(a=>console.log(a)));
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
