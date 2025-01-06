import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { Observable } from 'rxjs';
import { TaskTypeDetail } from '../models/task-type-detail.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {
  private readonly API = environment.ApiUrl;

constructor(private http: HttpClient) { }

getTaskTypes(): Observable<PaginatedApiResponse<TaskTypeDetail>>{

  return  this.http.get<PaginatedApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes`);

}

getTaskTypesById(id: string): Observable<ApiResponse<TaskTypeDetail>>{
  return this.http.get<ApiResponse<TaskTypeDetail>>(`${this.API}/tasktypes/${id}`);
}

}

