import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, timer} from 'rxjs';
import {delay, tap} from 'rxjs/operators';

import {LoaderService} from './services/loader/loader.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
    constructor(private loaderService: LoaderService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.loaderService.show();
        // req = req.clone({});
        return next.handle(req).pipe(
            delay(500),
            tap((response: HttpEvent<any>) => {
                this.loaderService.hide();
            }),
        );
    }
}
