import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private auth: AuthService
  ) { }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.includes('auth/local') && !req.url.includes('auth')) {
      if (this.auth.isAuthCheck()) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.auth.getToken()}`
          }
        });
      }
    }
    return next.handle(req);
  }
}
