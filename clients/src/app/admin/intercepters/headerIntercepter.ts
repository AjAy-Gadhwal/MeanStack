import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';
import { AuthService } from 'src/app/services/authService';

@Injectable()
export class headerIntercepter implements HttpInterceptor {
    constructor(private _router: Router, private authService: AuthService, private toastService: ToastService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let auth = this.authService.adminData();
        
        let isLogin = auth['token'] && auth['_id'];
        console.log('isLogin : ', isLogin);
        
        if (isLogin) {
            request = request.clone({ headers: request.headers.set('Authorization', auth['token']) });
        }
        
        if (!request.headers.has('content-type')) {
            request.headers.set('content-type', 'application/json');
            request.headers.set('accept', 'application/json, text/plain, */*');
        }

        return next.handle(request).pipe(map(event => {
            return event;
        }), catchError(err => {
            if (err.status === 401) {
                localStorage.removeItem('loginUser');
                this._router.navigate(['/login']);
                return null;
            }
            else if (err.status === 500) {
                this.toastService.error('');
            }
            else {
                return throwError(err);
            }
        }), finalize(() => {
        }));        
    }
}
