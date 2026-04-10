import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  doc,
  deleteDoc,
  setDoc,
  CollectionReference,
  DocumentData
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Product {
  id?: string;
  title: string;
  summary: string;
  price: number;
  bargain: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsRef: CollectionReference<DocumentData>;

  productForm = new FormGroup({
    title: new FormControl(''),
    summary: new FormControl(''),
    price: new FormControl(100),
    bargain: new FormControl(false),
  });

  constructor(private firestore: Firestore) {
    this.productsRef = collection(this.firestore, 'products');
  }

  addProduct(p: Omit<Product, 'id'>) {
    return addDoc(this.productsRef, p);
  }

  getProducts(): Observable<Product[]> {
    return collectionData(this.productsRef, { idField: 'id' }) as Observable<Product[]>;
  }

  deleteProduct(p: Product) {
    return deleteDoc(doc(this.firestore, 'products', p.id!));
  }

  updateProduct(p: Product, rate: number) {
    if (p.price === 10 && rate < 0) return;
    const newPrice = p.price + rate;
    return setDoc(doc(this.firestore, 'products', p.id!), { price: newPrice }, { merge: true });
  }
}
