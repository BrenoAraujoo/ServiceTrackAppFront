import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, throwError } from 'rxjs';
import { ApiResponse } from '../../components/models/api-response.model';
import { User } from '../../components/models/user/user.model';
import { UserCreateModel } from '../../components/models/user/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>('https://localhost:7278/v1/users');
  }
  getUserById(userId: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`https://localhost:7278/v1/users/${userId}`)
  }

  createUser(user: UserCreateModel): Observable<ApiResponse<UserCreateModel>>{
    return this.http.post<ApiResponse<UserCreateModel>>('https://localhost:7278/v1/users', user);
  }

  activateUser(userId: string): Observable<ApiResponse<void>> {
    return this.http.put<void>(`https://localhost:7278/v1/users/${userId}/activate`, null, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<void>) => {
          // Verifica se a resposta é um código de sucesso
          if (httpResponse.status === 204) {
            return {
              data: undefined,
              isSuccess: true,
              error: undefined,
            };
          } else {
            return {
              data: undefined,
              isSuccess: false,
              error: {
                code: httpResponse.status,
                message: 'Resposta inesperada da API',
                erros: [],
              },
            };
          }
        }),
        catchError((error: any) => {
          // Trata os erros da API
          const apiError: ApiResponse<void> = error.error || {
            isSuccess: false,
            error: {
              code: error.status,
              message: 'Erro genérico ActivateUser',
              erros: [],
            },
          };
          return throwError(() => apiError);
        })
      );
  }
  

}
