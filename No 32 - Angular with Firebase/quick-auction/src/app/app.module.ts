import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from "src/environments/environment"; //environment.ts içerisindeki firebaseConfig sekmesinin anlaşılabilmesi için gerekli modül
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductsService } from './shared/products.service'; // Tüm bileşenlerde kullanabilmek için ProductsService modülünü bildirip alttaki providers özelliğine de ekledik
import {ReactiveFormsModule} from '@angular/forms'; // Service tarafında FormControl ve FormGroup modüllerini kullanabilmek için bildirdik ve aşağıdaki import kısmında ekledik

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // AngularFireModule' ü environment.ts içerisindeki firebaseConfig ayarları ile başlatmış olduk
    AngularFirestoreModule
  ],
  providers: [ProductsService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
