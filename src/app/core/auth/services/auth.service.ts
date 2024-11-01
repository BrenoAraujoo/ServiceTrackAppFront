import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiResponse } from '../../api-response/api-response.model';
import { Token } from '../models/token.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../../../login/models/login.model';
import { LogoutModel } from '../models/logout.model';
import { RefreshAccessTokenModel } from '../models/refreshacesstoken.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY='refreshToken';

  constructor(private http: HttpClient , private jwtHelper: JwtHelperService) { }


  login(loginModel: LoginModel): Observable<ApiResponse<Token>> {

    return this.http.post<ApiResponse<Token>>('https://localhost:7278/v1/login', loginModel, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<Token>>) => {
          if (httpResponse.status === 200 && httpResponse.body?.data) {
            this.storeToken(httpResponse.body?.data?.accessToken, httpResponse.body?.data?.refreshToken)
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
  logout(): Observable<ApiResponse<any>> {
    const token = this.getToken() ?? "";
    const refreshAccessToken = this.getRefreshToken() ?? "";
    const logoutModel = new LogoutModel(token, refreshAccessToken);

    this.removeRefreshToken();
    this.removeToken();
    
    return this.http.post<ApiResponse<any>>('https://localhost:7278/v1/logout', logoutModel, { observe: 'response' })
        .pipe(
            map((httpResponse: HttpResponse<ApiResponse<any>>) => {
                if (httpResponse.status === 204) {

                }
                return {
                    data: undefined,
                    isSuccess: httpResponse.status === 204,
                    error: undefined
                };
            }),
            catchError((error: any) => {
                const apiError: ApiResponse<any> = {
                    data: undefined,
                    isSuccess: false,
                    error: {
                        code: error.status,
                        message: error.message || 'Erro desconhecido ao realizar logout'
                    }
                };
                return throwError(() => apiError);
            })
        );
}

  refreshAccessToken(){
    
    const token = this.getToken();
    const refreshAccessToken = this.getRefreshToken();
    
    if (!token || !refreshAccessToken) {
      return throwError(() => ({
          data: undefined,
          isSuccess: false,
          error: {
              code: 400,
              message: 'Token ou Refresh Token ausente.'
          }
      }));
  } 
  const refreshModel = new RefreshAccessTokenModel(token,refreshAccessToken);

    return this.http.post<ApiResponse<Token>>('https://localhost:7278/v1/refresh', refreshModel, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<Token>>) => {
          if (httpResponse.status === 200 && httpResponse.body?.data) {
            this.storeToken(httpResponse.body?.data?.accessToken, httpResponse.body?.data?.refreshToken)
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

  storeToken(token: string, refreshToken: string): void{
    localStorage.setItem(this.TOKEN_KEY, token)
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken)
  }
  getToken(): string | null{
    return localStorage.getItem(this.TOKEN_KEY)
  }
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY)
  }
  removeToken(): void{
    localStorage.removeItem(this.TOKEN_KEY)
  }
  removeRefreshToken(): void{
    localStorage.removeItem(this.REFRESH_TOKEN_KEY)
  }

  isAuthenticated(): boolean {

    const token = this.getToken();
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return token != '' && !isTokenExpired;
  }
    
}
