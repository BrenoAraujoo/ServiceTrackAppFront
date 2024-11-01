import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, throwError } from 'rxjs';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { User } from '../models/user.model';
import { UserCreateModel } from '../models/user-create.model';
import { UserUpdateModel } from '../models/user-update.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(pageNumber?: number, pageSize?: number): Observable<PaginatedApiResponse<User>> {

    pageNumber = pageNumber?? 1;
    pageSize = pageSize?? 5;

    return this.http.get<PaginatedApiResponse<User>>(`https://localhost:7278/v1/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getUserById(userId: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`https://localhost:7278/v1/users/${userId}`)
  }

  createUser(user: UserCreateModel): Observable<ApiResponse<UserCreateModel>> {
    return this.http.post<ApiResponse<UserCreateModel>>('https://localhost:7278/v1/users', user, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<UserCreateModel>>) => {
          if (httpResponse.status === 201) {
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
          const apiError: ApiResponse<UserCreateModel> = error. error || {
            data: undefined,
            isSuccess: false,
            error: {
              code: error.status,
              message: error.message
            }
          }
          return throwError(() => apiError);
        })
      );
  }
  
  updateUser (user: UserUpdateModel, userId: string): Observable<ApiResponse<UserUpdateModel>>{

    return this.http.put<ApiResponse<UserUpdateModel>>(`https://localhost:7278/v1/users/${userId}`, user, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<UserUpdateModel>>) => {
          if (httpResponse.status === 204) {
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
          const apiError: ApiResponse<UserCreateModel> = error. error || {
            data: undefined,
            isSuccess: false,
            error: {
              code: error.status,
              message: error.message
            }
          }
          return throwError(() => apiError);
        })
      );

  }
    

  changeUserStatus(userId: string, status: boolean): Observable<ApiResponse<void>> {
    const action = status?'activate':'deactivate';
    return this.http.put<void>(`https://localhost:7278/v1/users/${userId}/${action}`, null, { observe: 'response' })
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
                message: 'Resposta inesperada da API'
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
              message: error.message
            },
          };
          return throwError(() => apiError);
        })
      );
  }
  

}
