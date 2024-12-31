import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { Observable } from 'rxjs';
import { TaskType } from '../models/task-type.model';
import { PaginatedApiResponse } from '../../core/api-response/api-paginated-response.model';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

constructor(private http: HttpClient) { }

getTaskTypes(): Observable<PaginatedApiResponse<TaskType>>{

  return  this.http.get<PaginatedApiResponse<TaskType>>(`https://localhost:7278/v1/tasktypes`);

}

getTaskTypesById(id: string): Observable<ApiResponse<TaskType>>{
  return this.http.get<ApiResponse<TaskType>>(`https://localhost:7278/v1/tasktypes/${id}`);
}
}
