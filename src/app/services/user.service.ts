import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiResponse } from '../components/models/api-response.model';
import { User } from '../components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = [
    { id: 1, name: 'User One', email: 'userone@example.com' },
    { id: 2, name: 'User Two', email: 'usertwo@example.com' },
    { id: 3, name: 'User Three', email: 'userthree@example.com' },
  ];

  constructor(private http: HttpClient) { }


  getUserById(id: number): Observable<any> {
    const user = this.users.find(user => user.id === id);
    return of(user);  // Retorna o usuário específico
  }

  getUsers() : Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>('https://localhost:7278/v1/users');
  }
}
