import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

/*
UI tasarımında kullanacağımız Material bileşenlerine ait modül bildirimleri
*/
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

/* 
 HttpClientModule'ü burada import ettik.
 Böylece HTTP çağrıları yapabilmemizi sağlayan
 HttpClient nesnesini ana modüle bağlı olan 
 tüm componenetlere enjekte edebiliriz.

 HttpClient'ı arayüze veri döndüren dummy bir API
 servisine Get çağrısı yapmak için kullanacağız.
 */
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    HttpClientModule, //Buraya da eklemeyi unutmamak lazım
    // Aşağıdakilerde Material modülleri için yapılan ilaveler
    MatToolbarModule,
    MatCardModule,
    MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
