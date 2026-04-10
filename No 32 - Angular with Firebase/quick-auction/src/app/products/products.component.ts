import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../shared/products.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(public productsService: ProductsService) { }

  onSubmit() {
    const formData = this.productsService.productForm.value;
    this.productsService.addProduct(formData as Parameters<typeof this.productsService.addProduct>[0]);
  }
}
