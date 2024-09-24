import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports:[CommonModule,ButtonModule], 
  standalone: true,
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
  });
  }

  viewUser(userId: number): void {
    this.router.navigate([`/users/${userId}`]);  // Redireciona para a rota com o ID do usuário
  }
}
