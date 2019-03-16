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
    price: new FormControl(100),
    bargain: new FormControl(false),
  })

  /*
  Firestore veritabanına yeni bir Product verisi eklemek için kullanılan servis metodu.
  collection ile Firestore tarafındaki koleksiyonu işaret ediyoruz.
  Gelen json içeriği products isimli koleksiyona yazılıyor.
  */
  addProduct(p) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection("products").add(p).
        then(res => { }, err => reject(err));
    });
  }

  getProducts() {
    /*
     Firestore veri tabanındaki products koleksiyonu içerisinde yer alan tüm dokümanları alıyoruz.
     snapshotChanges çağrısı değişikliklerin kontrol altında olmasını sağlar. 
     Bizim değişiklikleri yakalayıp güncellemeler yapmamıza gerek kalmaz.
    */

    return this.firestore.collection("products").snapshotChanges();
  }

  // silme işlemini üstlenen servis metodumuz
  deleteProduct(p) {
    return this.firestore
      .collection("products")
      .doc(p.payload.doc.id) // firestrore tarafındaki id bilgisini kullanacak.
      .delete();
  }

  // Güncelleme operasyonu. rate değişkenine gelen değere göre price değerini değiştiriyoruz
  updateProduct(p, rate) {
    // Önce üzerinde çalışılan veriyi alalım.
    var prd=p.payload.doc.data();
    if(prd.price==10 && rate<0) // fiyatı sıfırın altına indirmek istemeyiz çünkü
      return;    
    // Üst limit kontrolü de konulabilir belki

    // fiyat arttırımı veya azaltımı uygunsa yeni değeri alıyoruz ve firestore üzerinden güncelleme yapıyoruz
    var newPrice=prd.price+rate;
    return this.firestore
      .collection("products")
      .doc(p.payload.doc.id)
      .set({ price: newPrice }, { merge: true });
    // merge özelliğine atanan true değeri, tüm entity değerlerinin güncellenmesi yerine sadece metoda ilk parametre ile gelenlerin ele alınmasını söyler.
  }
}