import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../features/products/product/product.component';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  listTransaction(dateRage?: any): Observable<any> {
    // [{"operator":"between","value"🙁"2023-11-26T14:14:49.791Z", "2023-11-28T14:14:49.791Z"],"prop":"createdAt"}]
    if (dateRage) {
      const timeStartISO = dateRage[0].toISOString();
      const timeEndISO = dateRage[1].toISOString();
      // const filter = JSON.stringify([
      //   { operator: 'gte', value: timeStartISO, prop: 'createdAt' },
      //   { operator: 'lte', value: timeEndISO, prop: 'createdAt' }
      // ]);
      const filter = JSON.stringify([
        {
          operator: 'between',
          value: [timeStartISO, timeEndISO],
          prop: 'createdAt'
        }
      ]);
      console.log(filter);
      let queryParams = new HttpParams().set('filter', filter);
      return this.http.get(`${this.apiUrl}/transactions/list`, {
        params: queryParams
      });
    } else {
      return this.http.get(`${this.apiUrl}/transactions/list`);
    }
  }
}
