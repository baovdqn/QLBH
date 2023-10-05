import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TreeService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }

  createCategories(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/categories`, body);
  }

  getAllTree(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tree`);
  }

  getTreeByCategory(categoryID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/tree/listByCategory/${categoryID}`);
  }
}
