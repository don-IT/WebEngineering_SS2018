import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import {SessionStorageService} from './services/session-storage.service';

@Injectable()
export class AuthorizationHttpInterceptor implements HttpInterceptor {

    constructor(private readonly sessionStorageService: SessionStorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + this.sessionStorageService.getToken())});
        return next.handle(authReq);
    }

}
