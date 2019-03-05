import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ArticleService } from 'src/app/article.service';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})

/*
Bileşen, OnInit ve OnDestroy fonksiyonlarını implemente ediyor.
Yani bileşen oluşturulurken ve iade edilirken yaptığımız bağzı işlemler var.

Init'te güncel makale listesi için bir stream açılmakta ve o an üzerinde çalışılan 
makale için bir abonelik başlatılmakta. Destroy metodunda ise üzerinde çalışılan makalenin aboneliğinden çıkılmakta.

articles değişkeni Observable tipinden bir string dizisi ve servisin allOfThem 
özelliği ile ilişkilendirilip bir stream oluşması sağlanıyor.

Bileşen üzerinden socket sunucusuna fırlatılan olayların karşılığından fırlatılan olaylar,
Observable değişkenin güncel kalmasını sağlayacaktır.
*/
export class ArticleListComponent implements OnInit, OnDestroy {

  articles: Observable<string[]>;
  currentArticle: string;
  private _subscription: Subscription;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.articles = this.articleService.allOfThem;
    this._subscription = this.articleService.currentArticle.subscribe(a => this.currentArticle = a.id);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  // id değerine göre makale çekilmesi için gerekli sunucu olayını tetikler
  getArticle(id: string) {
    this.articleService.get(id);
  }

  // Yeni bir makale oluşturulması için gerekli olayı tetikler
  newArticle() {
    this.articleService.add();
  }
}