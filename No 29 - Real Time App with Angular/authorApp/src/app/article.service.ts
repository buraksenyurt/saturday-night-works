import { Injectable, NgZone } from '@angular/core';
import { Socket } from 'ngx-socket-io';  // Socket sunucusuna event fırlatıp yakalayacağımız için
import { Article } from './article'; //Article tipini kullanacağımız için
import { BehaviorSubject } from 'rxjs';

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
  private readonly _currentArticle = new BehaviorSubject<Article>({
    id: '',
    content: 'Var olan bir makaleyi seç ya da yeni bir tane oluştur'
  });
  private readonly _allOfThem = new BehaviorSubject<string[]>([]);

  currentArticle = this._currentArticle.asObservable();
  allOfThem = this._allOfThem.asObservable();

  constructor(private socket: Socket, private ngZone: NgZone) {
    this.socket.fromEvent<Article>('ready').subscribe(article => {
      if (!article) {
        return;
      }

      this.ngZone.run(() => {
        this._currentArticle.next(article);
      });
    });

    this.socket.fromEvent<string[]>('warnEveryone').subscribe(articleIds => {
      this.ngZone.run(() => {
        this._allOfThem.next(articleIds ?? []);
      });
    });
  } //Constructor injection ile Socket modülünü yükledik

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
