import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private readonly router: Router,
    private accountService: AccountService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 400) {
          alert(err.error.error);
        }
        if (err.status === 500) {
          alert('Hệ thống đang bận. Mời thử lại!');
        }
        if (err.status === 404) {
          this.router.navigate(['/']);
        }
        if (err.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
          // this.accountService.changesUserValue(null);
        }

        const error = err.error.error;
        return throwError(error);
      })
    );
  }
}
