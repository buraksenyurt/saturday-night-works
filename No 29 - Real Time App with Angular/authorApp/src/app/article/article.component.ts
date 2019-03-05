import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArticleService } from 'src/app/article.service';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/article';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit, OnDestroy {
  article: Article;
  private _subscription: Subscription;

  /*
  ArticleService, Constructor Injection ile içeriye alınır.
  */
  constructor(private ArticleService: ArticleService) { }

  /*
  Bileşen initialize edilirken güncel makale için bir abonelik başlatılır.
  Böylece gerek bu aboneliğin sahibinin değişiklikleri
  gerek diğerlerinin değişiklikleri aynı makalede çalışan herkese yansır.
  */
  ngOnInit() {
    this._subscription = this.ArticleService.currentArticle.pipe(
      startWith({ id: '', content: 'Var olan bir makaleyi seç ya da yeni bir tane oluştur' })
    ).subscribe(a => this.article = a);
  }

  // Bileşen ölürken üzerinde çalışan makalenin aboneliğinden çıkılır
  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  /*
   Arayüzdeki keyup olayı ile bağlanmıştır
  Yani tuştan parmak kaldırdıkça servise bir güncelleme olayı fırlatılır 
  ki bu tüm abonelerce alınır.
  */
  updateArticle() {
    this.ArticleService.update(this.article);
  }
}
