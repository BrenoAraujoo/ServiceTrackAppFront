import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TaskTypeDetail } from '../models/task-type-detail.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';
import { environment } from '../../../environments/environment.development';
import { TaskTypeCreateModel } from '../models/task-type-create.model';
import { TaskTypeUpdateModel } from '../models/task-type-update.model';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {
  private readonly API = environment.ApiUrl;

  constructor(private _http: HttpClient) { }

  getTaskTypes(): Observable<PaginatedApiResponse<TaskTypeDetail>> {

    return this._http.get<PaginatedApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes`);

  }

  getTaskTypesById(id: string): Observable<ApiResponse<TaskTypeDetail>> {
    return this._http.get<ApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes/${id}`);
  }

  createTaskType(taskType: TaskTypeCreateModel): Observable<ApiResponse<TaskTypeDetail>> {
    return this._http.post<ApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes`, taskType, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<TaskTypeDetail>>) => {
            return {
              isSuccess: httpResponse.status === 201,
              data: httpResponse.body?.data,
              error: httpResponse.status === 201 ?{
                code: httpResponse.status,
                message: 'Resposta inesperada da API'
              }:undefined
            }
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
  }
  
  updateTaskType(taskType: TaskTypeUpdateModel, taskTypeId: string): Observable<ApiResponse<void>> {
    return this._http.put<ApiResponse<void>>(`${this.API}/tasktypes/${taskTypeId}`, taskType, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<void>>) => {
          return {
            isSuccess: httpResponse.status === 204,
            error: httpResponse.status !== 204 ? {
              code: httpResponse.status,
              message: 'Resposta inesperada da API'
            } : undefined
          } as ApiResponse<void>
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
  }

  deleteTaskType(taskTypeId: string): Observable<ApiResponse<void>> {
    return this._http.delete<ApiResponse<void>>(`${this.API}/tasktypes/${taskTypeId}`, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<void>>) => {
          return {
            isSuccess: httpResponse.status === 204,
            error: httpResponse.status !== 204 ? {
              code: httpResponse.status,
              message: 'Resposta inesperada da API'
            } : undefined
          }
        }),
        catchError((error) => {
          return throwError(() => error);
        })
      )
  }

  changeTaskTypeStatus(taskTypeId: string, status: boolean): Observable<ApiResponse<any>> {
    const action = status ? 'activate' : 'deactivate';
    return this._http.put<any>(`${this.API}/tasktypes/${taskTypeId}/${action}`, null, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<any>) => {
          return {
            isSuccess: httpResponse.status === 204,
            error: httpResponse.status !== 204 ? {
              code: httpResponse.status,
              message: 'Resposta inesperada da API'
            } : undefined
          }
        }),
        catchError((error) => {
          return throwError(() => error)
        })
      )
  }

}