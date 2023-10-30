import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ILogin } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('currentUser') || '{}')
  );

  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  changesUserValue(values: any): any {
    this.currentUserSubject.next(values);
  }

  apiUrl = environment.apiUrl;

  login(body: ILogin): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, body);
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  registerAccountCustomer(body: any) {
    return this.http.post<any>(`${this.apiUrl}/users`, body);
  }

  getAccountForRole(role: string) {
    const filter = JSON.stringify([
      { operator: 'eq', value: role, prop: 'role' }
    ]);
    let queryParams = new HttpParams().set('filter', filter);
    return this.http.get(`${this.apiUrl}/users`, { params: queryParams });
  }
}
