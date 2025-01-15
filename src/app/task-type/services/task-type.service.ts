import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { catchError, map, Observable, Observer, throwError } from 'rxjs';
import { TaskTypeDetail } from '../models/task-type-detail.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';
import { environment } from '../../../environments/environment.development';
import { TaskTypeCreateModel } from '../models/task-type-create.model';
import { UserCreateModel } from '../../user/models/user-create.model';
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
          const apiError: ApiResponse<TaskTypeDetail> = error.error || {
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
  
  updateTaskType(taskType: TaskTypeUpdateModel, taskTypeId: string): Observable<ApiResponse<any>> {
    return this._http.put<ApiResponse<any>>(`${this.API}/tasktypes/${taskTypeId}`, taskType, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<any>>) => {
          if (httpResponse.status === 204) {
            return {
              isSuccess: true
            } as ApiResponse<any>
          }
          return {
            isSuccess: false,
            erro: httpResponse.body?.error
          } as ApiResponse<any>
        }),
        catchError((error: any) => {
          const apiError: ApiResponse<any> = {
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

  deleteTaskType(taskTypeId: string): Observable<ApiResponse<any>> {
    return this._http.delete<ApiResponse<any>>(`${this.API}/tasktypes/${taskTypeId}`, { observe: 'response' })
      .pipe(
        map((httpResponse: HttpResponse<ApiResponse<any>>) => {
          if (httpResponse.status === 204) {
            return {
              isSuccess: true,
            } as ApiResponse<any>
          }
          return {
            isSuccess: false,
            error: httpResponse.body?.error
          }
        }),
        catchError((error: any) => {
          const apiError: ApiResponse<any> = {
            isSuccess: false,
            error: {
              code: error.error.error.code,
              message: error.error.error.message
            }
          }
          return throwError(() => apiError);
        })
      )
  }

  changeTaskTypeStatus(taskTypeId: string, status: boolean) : Observable<ApiResponse<any>>{
    const action = status? 'activate': 'deactivate';
    return this._http.put<any>(`${this.API}/tasktypes/${taskTypeId}/${action}`,null, {observe: 'response'})
    .pipe(
      map((httpResponse: HttpResponse<any>) =>{
        if(httpResponse.status === 204){
          return{
            isSuccess: true
          } as ApiResponse<any>
        }else{
          return {
            isSuccess: false,
            error: httpResponse.body?.error
          }
        }
      }),
      catchError ((error: any) => {
        const apiError: ApiResponse<any> = {
          isSuccess: false,
          error: {
            code: error.error.error.code,
            message: error.error.error.message
          }
        }
        return throwError(()=> apiError)
      })
    )
  }

}