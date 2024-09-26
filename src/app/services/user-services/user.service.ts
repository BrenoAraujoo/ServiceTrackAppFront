import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  getUserById(id: string): Observable<ApiResponse<User>> {
    return this.http.get<ApiResponse<User>>(`https://localhost:7278/v1/users/${id}`)
  }

  createUser(user: UserCreateModel): Observable<ApiResponse<UserCreateModel>>{
    return this.http.post<ApiResponse<UserCreateModel>>('https://localhost:7278/v1/users', user);
  }


}
