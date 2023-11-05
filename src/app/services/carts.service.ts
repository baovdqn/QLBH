import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../features/products/product/product.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}
  carts$: BehaviorSubject<Array<Product>> = new BehaviorSubject<any[]>([]);

  createTransaction(body: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/transactions/createTransaction`,
      body
    );
  }
  listTransaction(): Observable<any> {
    return this.http.get(`${this.apiUrl}/transactions/list`);
  }
}
