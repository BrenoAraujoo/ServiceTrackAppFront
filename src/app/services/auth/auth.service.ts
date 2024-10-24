import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../models/auth/login.model';
import { ApiResponse } from '../../models/api-response/api-response.model';
import { Token } from '../../models/auth/token.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private readonly TOKEN_KEY = '';

  constructor(private http: HttpClient , private jwtHelper: JwtHelperService) { }


  login(loginModel: LoginModel): Observable<ApiResponse<Token>> {

    return this.http.post<ApiResponse<Token>>('https://localhost:7278/v1/login', loginModel, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<Token>>) => {
          if (httpResponse.status === 200) {
            console.log(httpResponse.body?.data?.accessToken)
            return {
              data: httpResponse.body?.data,
              isSuccess: true,
              error: undefined
            }
          } else {
            return {
              data: undefined,
              isSuccess: false,
              error: httpResponse.body?.error
            }
          }
        }),
        catchError((error: any) => {
          const apiError: ApiResponse<Token> = error.error || {
            data: undefined,
            isSuccess: false,
            error: {
              code: error.status,
              message: error.message
            }
          }
          return throwError(() => apiError);
        })

      )
  }

  storeToken(token: string): void{
    localStorage.setItem(this.TOKEN_KEY, token)
  }
  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY)
  }
  removeToken(): void{
    localStorage.removeItem(this.TOKEN_KEY)
  }

  isAuthenticated(): boolean {

    const token = this.getToken();
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return token != '' && !isTokenExpired;
  }
    
}
