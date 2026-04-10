import { TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { ProductsService } from './shared/products.service';
import type { Product } from './shared/products.service';

class MockProductsService {
  productForm = new FormGroup({
    title: new FormControl(''),
    summary: new FormControl(''),
    price: new FormControl(100),
    bargain: new FormControl(false),
  });
  addProduct(_p: Omit<Product, 'id'>) { return Promise.resolve(); }
  getProducts(): Observable<Product[]> { return of([]); }
  deleteProduct(_p: Product) { return Promise.resolve(); }
  updateProduct(_p: Product, _rate: number) { return Promise.resolve(); }
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: ProductsService, useClass: MockProductsService }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title quick-auction', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('quick-auction');
  });
});

