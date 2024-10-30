import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{



    constructor(private _authService: AuthService) {

        
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        throw new Error("Method not implemented.");

         /* const authToken = this._authService.getToken();

        // Clone the request and replace the original headers with
        // cloned headers, updated with the authorization. 
        const authReq = req.clone({
            headers: req.headers.set('Bearer', authToken)
        });

        // send cloned request with header to the next handler.
        return next.handle(authReq);
        */
    }
    

}