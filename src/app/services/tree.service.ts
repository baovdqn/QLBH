import { HttpClient, HttpParams } from '@angular/common/http';
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

  editCategories(body: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/categories/update/${id}`, body);
  }

  detailCategory(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/categories/detail/${id}`);
  }

  getAllTree(query?: any, filter?: any): Observable<any> {
    let queryParams = '';
    if (query) {
      queryParams = query;
    }
    return this.http.get(`${this.apiUrl}/tree${queryParams}`);
  }

  getTreeWithFilter(name: string) {
    const filter = JSON.stringify([
      { operator: 'iLike', value: name, prop: 'name' }
    ]);
    let queryParams = new HttpParams().set('filter', filter);
    return this.http.get(`${this.apiUrl}/tree`, { params: queryParams });
  }

  createTree(body: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/tree`, body);
  }

  editTree(body: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/tree/update/${id}`, body);
  }

  detailTree(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/tree/detail/${id}`);
  }

  getTreeByCategory(categoryID: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/tree/listByCategory/${categoryID}`);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/categories/delete/${id}`);
  }
  deleteTree(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/tree/delete/${id}`);
  }
}
