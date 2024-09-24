import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users = [
    { id: 1, name: 'User One', email: 'userone@example.com' },
    { id: 2, name: 'User Two', email: 'usertwo@example.com' },
    { id: 3, name: 'User Three', email: 'userthree@example.com' },
  ];

  constructor() { }

  getUsers(): Observable<any[]> {
    return of(this.users);  // Retorna os usuários como um Observable
  }

  getUserById(id: number): Observable<any> {
    const user = this.users.find(user => user.id === id);
    return of(user);  // Retorna o usuário específico
  }
}
