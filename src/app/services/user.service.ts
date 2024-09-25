import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../components/models/api-response.model';
import { User } from '../components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`https://localhost:7278/v1/users/${id}`)
    
  }

  getUsers() : Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>('https://localhost:7278/v1/users');
  }
}
