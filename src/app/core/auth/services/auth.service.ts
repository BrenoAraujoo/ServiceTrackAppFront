import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../api-response/api-response.model';
import { Token } from '../models/token.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginModel } from '../../../login/models/login.model';
import { LogoutModel } from '../models/logout.model';
import { RefreshAccessTokenModel } from '../models/refreshacesstoken.model';
import { environment } from '../../../../environments/environment.development';
import {jwtDecode} from 'jwt-decode';
import { JwtPayload } from '../models/jwtPayload.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  
  private readonly TOKEN_KEY = 'token';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly API = environment.ApiUrl;


  constructor(private _http: HttpClient , private _jwtHelper: JwtHelperService) { }


  login(loginModel: LoginModel): Observable<ApiResponse<Token>> {

    return this._http.post<ApiResponse<Token>>(`${this.API}/login`, loginModel, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<Token>>) => {
          if (httpResponse.status === 200 && httpResponse.body?.data) {
            this.storeToken(httpResponse.body?.data?.accessToken, httpResponse.body?.data?.refreshToken)
            const teste = this.decodeToken();
            const role = teste?.role
            return {
              data: httpResponse.body?.data,
              isSuccess: true,
              error: undefined
            }
          } 
            return {
              data: undefined,
              isSuccess: false,
              error: httpResponse.body?.error
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
    
    return this._http.post<ApiResponse<any>>(`${this.API}/logout`, logoutModel, { observe: 'response' })
        .pipe(
            map((httpResponse: HttpResponse<ApiResponse<any>>) => {
                if (httpResponse.status === 204) {
                  return {
                    data: undefined,
                    isSuccess: true,
                    error: undefined
                } as ApiResponse<any>;
                }
                return {
                    isSuccess: false
                } as ApiResponse<any>
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

    return this._http.post<ApiResponse<Token>>(`${this.API}/refresh`, refreshModel, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<Token>>) => {
          if (httpResponse.status === 200 && httpResponse.body?.data) {
            this.storeToken(httpResponse.body?.data?.accessToken, httpResponse.body?.data?.refreshToken)
            return {
              data: httpResponse.body?.data,
              isSuccess: true,
              error: undefined
            } as ApiResponse<Token>
          } 
            return {
              data: undefined,
              isSuccess: false,
              error: httpResponse.body?.error
          } as ApiResponse<Token>
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

  private decodeToken(): JwtPayload | null{
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }
  public getUserRoles(): string[]{
    const decodedToken = this.decodeToken();
    return decodedToken ? decodedToken.role : [];
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
    const isTokenExpired = this._jwtHelper.isTokenExpired(token);
    return token != '' && !isTokenExpired;
  }
    
}
