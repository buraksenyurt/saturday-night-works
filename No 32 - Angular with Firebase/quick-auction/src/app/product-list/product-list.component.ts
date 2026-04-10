import { Component, OnInit } from '@angular/core';
import { ProductsService, Product } from '../shared/products.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  allProducts: Product[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe(res => this.allProducts = res);
  }

  delete = (p: Product) => this.productService.deleteProduct(p);
  increasePrice = (p: Product) => this.productService.updateProduct(p, 10);
  decreasePrice = (p: Product) => this.productService.updateProduct(p, -10);
}
