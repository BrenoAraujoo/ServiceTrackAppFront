import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../../components/models/auth/login.model';
import { ApiResponse } from '../../components/models/api-response/api-response.model';
import { Token } from '../../components/models/auth/token.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private http: HttpClient) { }


  login(loginModel: LoginModel) : Observable<ApiResponse<Token>>{

    return this.http.post<ApiResponse<Token>>('https://localhost:7278/v1/login', loginModel, {observe: 'response'})
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
          const apiError: ApiResponse<Token> = error. error || {
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
}
