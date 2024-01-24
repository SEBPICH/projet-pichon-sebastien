import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SharedService } from './shared/shared.service'; // Adjust the path

@Injectable()
export class ApiHttpInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.sharedService._accessToken;

    if (token) {
      req = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });
    }

    return next.handle(req).pipe(
      tap((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          const enteteAuthorization = evt.headers.get('Authorization');
          if (enteteAuthorization) {
            const [, receivedToken] = enteteAuthorization.split(/Bearer\s+(.*)$/i);
            if (receivedToken) {
              this.sharedService.setAccessToken(receivedToken);
              console.log('Bearer récupéré : ' + receivedToken);
            }
          }
        }
      }),
    );
  }
}
