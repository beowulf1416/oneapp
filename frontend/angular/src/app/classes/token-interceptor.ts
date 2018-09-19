import { Injectable } from '@angular/core';
import { HttpHandler, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

function get_session_storage(): any {
    return window.sessionStorage;
  }

@Injectable()
export class TokenInterceptor {
    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const session = get_session_storage();
        const token = session.getItem('token');
        if (token != null && token !== '') {
            console.log('adding token', token);
            request = request.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(request);
    }
}
