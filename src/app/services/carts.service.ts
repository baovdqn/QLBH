import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../features/products/product/product.component';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  constructor() {}
  carts$: BehaviorSubject<Array<Product>> = new BehaviorSubject<any[]>([]);
}
