import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms"; // FormGroup ve FormControl tiplerini kullanabilmek için eklemeliyiz
import { AngularFirestore } from "@angular/fire/firestore"; // Firestore tarafı ile konuşmamızı sağlayacak modül. Servisini constructor'da enjekte ediyoruz

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private firestore: AngularFirestore) { }

  /* 
  Yeni bir FormGroup nesnesi örnekliyoruz.
  title, summary, price ve online isimli FormControl nesneleri içeriyor.
  bu özelliklere atanan değerleri Firebase tarafına yazacağız.
  element adları arayüz tarafında da birebir kullanılacaklar
  */
  productForm = new FormGroup({
    title: new FormControl(''),
    summary: new FormControl(''),
    price: new FormControl(0),
    online: new FormControl(false),
  })
}
