import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { User } from '../../models/user/user.model';
import { ApiResponse } from '../../models/api-response.model';
import { IconFieldModule } from 'primeng/iconfield';
import { TableModule } from 'primeng/table';
import { InputIconModule } from 'primeng/inputicon';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports:[CommonModule,ButtonModule, TableModule, InputIconModule, IconFieldModule,TagModule], 
  standalone: true,
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response:ApiResponse<User>) => {
      
      if(response.isSuccess){
        this.users =  Array.isArray(response.data) ? response.data : [response.data];
      }else{
        console.log('erro-> ' + response.error)
      }
      
  });
  }

  viewUser(userId: string): void {
    this.router.navigate([`/users/${userId}`]);  // Redireciona para a rota com o ID do usuário
  }

  
  createUser(): void{
    this.router.navigate(['/users/create'])
  }

  getUserStatus(user: User): string {
    return user.active ? 'ativo' : 'inativo';
  }

  userStatusColor(active: boolean){
    return active? 'success':'danger';
  }
}
