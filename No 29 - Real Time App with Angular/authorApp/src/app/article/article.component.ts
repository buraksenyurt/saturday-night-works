import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs';
import { Article } from '../article';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})

export class ArticleComponent implements OnInit, OnDestroy {
  article: Article = { id: '', content: '' };
  private _subscription: Subscription | undefined;

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
    this._subscription?.unsubscribe();
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
