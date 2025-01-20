import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, throwError } from 'rxjs';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { User } from '../models/user.model';
import { UserCreateModel } from '../models/user-create.model';
import { UserUpdateModel } from '../models/user-update.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API = environment.ApiUrl;

  constructor(private _http: HttpClient) { }

  getUsers(pageNumber?: number, pageSize?: number): Observable<PaginatedApiResponse<User>> {

    pageNumber = pageNumber?? 1;
    pageSize = pageSize?? 5;

    return this._http.get<PaginatedApiResponse<User>>(`${this.API}/users?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getUserById(userId: string): Observable<ApiResponse<User>> {
    return this._http.get<ApiResponse<User>>(`${this.API}/users/${userId}`)
  }

  createUser(user: UserCreateModel): Observable<ApiResponse<UserCreateModel>> {
    return this._http.post<ApiResponse<UserCreateModel>>(`${this.API}/users`, user, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<UserCreateModel>>) => {
            return {
              isSuccess: httpResponse.status === 201,
              data: httpResponse.body?.data,
              error: httpResponse.status !== 204 ? {
                code: httpResponse.status,
                message: 'Resposta inesperada da API'
              } : undefined
            }
        }),
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
  
  updateUser (user: UserUpdateModel, userId: string): Observable<ApiResponse<UserUpdateModel>>{
    return this._http.put<ApiResponse<UserUpdateModel>>(`${this.API}/users/${userId}`, user, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<UserUpdateModel>>) => {
            return {
              isSuccess: httpResponse.status === 204,
              data: undefined,
              error: httpResponse.status !== 204 ? {
                code: httpResponse.status,
                message: 'Resposta inesperada da API'
              } : undefined
            }
        }),
        catchError((error: any) => {
          return throwError(() => error);
        })
      );
  }
    

  changeUserStatus(userId: string, status: boolean): Observable<ApiResponse<void>> {
    const action = status ? 'activate' : 'deactivate';
  
    return this._http.put<void>(`${this.API}/users/${userId}/${action}`, null, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<void>) => ({
          isSuccess: httpResponse.status === 204,
          data: undefined,
          error: httpResponse.status !== 204 ? {
            code: httpResponse.status,
            message: 'Resposta inesperada da API'
          } : undefined
        })),
        catchError((error: HttpErrorResponse) => {
         const apiError = error;
          return throwError(() => apiError);
        })
      );
  }
  

}
