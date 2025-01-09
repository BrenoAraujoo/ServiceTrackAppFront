import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { TaskTypeDetail } from '../models/task-type-detail.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';
import { environment } from '../../../environments/environment.development';
import { TaskTypeCreateModel } from '../models/task-type-create.model';
import { UserCreateModel } from '../../user/models/user-create.model';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {
  private readonly API = environment.ApiUrl;

  constructor(private http: HttpClient) { }

  getTaskTypes(): Observable<PaginatedApiResponse<TaskTypeDetail>> {

    return this.http.get<PaginatedApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes`);

  }

  getTaskTypesById(id: string): Observable<ApiResponse<TaskTypeDetail>> {
    return this.http.get<ApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes/${id}`);
  }

  createTaskType(taskType: TaskTypeCreateModel): Observable<ApiResponse<TaskTypeDetail>> {
    return this.http.post<ApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes`, taskType, { observe: 'response' })
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
}

