import { Component } from '@angular/core';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ArticleListComponent, ArticleComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authorApp';
}
