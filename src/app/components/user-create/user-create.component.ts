import { Component } from '@angular/core';
import { UserService } from '../../services/user-services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCreateModel } from '../models/user/user-create.model';
import { ApiResponse } from '../models/api-response.model';
import { User } from '../models/user/user.model';
import { ButtonModule } from 'primeng/button';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputIconModule, IconFieldModule, ButtonModule, ImageModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent {

  constructor(private userService: UserService, private router: Router) { }

  user: UserCreateModel = { name: '', email: '', jobPosition: '', smartPhoneNumber: '' };

  createUser(userCreateModel: UserCreateModel): void {
    this.userService.createUser(userCreateModel).subscribe({
      next: (response) => {
        if (response.isSuccess)
          this.user = response.data;

      },
      error: (err) => {
        console.error('Erro na requisição:', err); // Mostra toda a estrutura do erro
        if (err.error) {

          const errorResponse = err.error; // ou err.message, err.json(), etc.
          // Caso a estrutura do erro seja diferente
          console.log('Código:', errorResponse.error.code || 'Código não disponível');
          console.log('Mensagem:', errorResponse.error.message || 'Mensagem não disponível');
          console.log('Detalhes:', errorResponse.error.erros || 'Detalhes não disponíveis');
        } else {
          console.error('Erro genérico:', err);
        }
      }
    });
  }

}
