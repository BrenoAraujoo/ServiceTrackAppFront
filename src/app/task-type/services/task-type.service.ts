import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../../core/api-response/api-response.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskTypeService {

constructor(private http: HttpClient) { }

getTaskTypes(): Observable<ApiResponse<any>>{

  return  this.http.get<ApiResponse<any>>(`https://localhost:7278/v1/tasktypes`);

}

}
