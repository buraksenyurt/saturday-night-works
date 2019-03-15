import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../shared/products.service'; // ProductsService modülünü bildiriyoruz

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productsService: ProductsService) { } // Constructor injection ile ProductsService tipini içeriye alıyoruz

  auctions = []; // açık artırma verilerini tutacağımız array

  ngOnInit() {
  }

  // Bileşendeki button'a basıldığında (click) niteliğine atanan olay bildirimi nedeniyle bu metod çalışacaktır
  onSubmit() {
    let formData = this.productsService.productForm.value; // aslında servis tarafındaki form kontrolü bileşenle ilişkilendirildiğinden girilen değerler oraya da yansır
    console.log(formData); // F12 ile tarayıcı Console penceresinden bu çıktıya bakabiliriz
    this.productsService.addProduct(formData).then(res => { 
      //TODO Buradan alert çıkartabilir miyiz bakalım.
    });
  }
}
