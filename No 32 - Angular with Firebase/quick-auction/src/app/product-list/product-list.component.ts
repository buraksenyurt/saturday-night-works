import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service'; // ProductService modülünü bildiriyoruz

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService: ProductsService) { } // servisi constructor üzerinden enjekte ettik

  allProducts; // Firestore koleksiyonundaki tüm dokümanları temsil edecen değişkenimiz

  ngOnInit() {
    /*
    Bileşen initialize aşamasındayken servisten tüm ürünleri çekiyoruz.
    Subscribe metoduyla da servisin getProducts metodundan dönen sonuç kümesini,
    allProducts isimli değişkene bağlıyoruz ki bunu bileşenin ön yüzü kullanıyor
    */
    this.productService
      .getProducts()
      .subscribe(res => this.allProducts = res);
  }

  /*
    Bir ürünü silmek için kullandığımız metod. 
    Servis tarafındaki deleteProduct çağrılıyor.
    Parametre olarak o anki product içeriği gönderilmekte
  */
  delete = p => this.productService.deleteProduct(p);

  /*
    Ürünün sadece bargain özelliğini update eden bir metod 
    olarak düşünelim. Senaryoda pazarlık payı olup olmadığını belirten
    checkbox'ın durumunu güncelletiyoruz
  */
  
  //TODO: Güncelleme metodu gelecek
}
