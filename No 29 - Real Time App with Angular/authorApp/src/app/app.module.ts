import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticleComponent } from './article/article.component';

/*
  Angular tarafından socket haberleşmesi için gerekli modül
  bildirimleri. Web Socket sunucusunun adresi de konfigurasyon bilgisi olarak tanımlanmakta.
*/
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:5004' };

@NgModule({
  declarations: [
    AppComponent,
    ArticleListComponent,
    ArticleComponent
  ],
  imports: [
    BrowserModule,
    // Üstte belirtilen url bilgisi ile birlikte socket modülünü hazır hale getirip içeri alıyoruz
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
