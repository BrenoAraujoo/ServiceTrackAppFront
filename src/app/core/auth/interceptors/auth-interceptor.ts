import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { finalize, Observable } from "rxjs";
import { LoadingService } from "../services/loading.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private _authService: AuthService,
        private _loadingService: LoadingService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authToken = this._authService.getToken();
        this._loadingService.show();

        // If the token is not empty, clone the request and replace the original headers with
        // cloned headers, updated with the authorization. 
        var authReq = req.clone();
        if (authToken) {
            authReq = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${authToken}`)
            });
        }
        return next.handle(authReq)
            .pipe(
                finalize(() => this._loadingService.hide()) // Hides the spinner component
            );

    }

}