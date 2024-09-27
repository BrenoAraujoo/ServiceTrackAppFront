import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserCreateModel } from '../../models/user/user-create.model';
import { ApiResponse } from '../../models/api-response.model';
import { User } from '../../models/user/user.model';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';

import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ImageModule } from 'primeng/image';
import { UserTabDetailsComponent } from '../user-tab-details/user-tab-details.component';
import { UserTabConfigComponent } from '../user-tab-config/user-tab-config.component';
import { UserFormService } from '../../../services/user-services/user-form.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, InputIconModule, IconFieldModule, ButtonModule, ImageModule, ReactiveFormsModule, PasswordModule, TabViewModule],
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss'
})
export class UserCreateComponent implements OnInit {

  userForm!: FormGroup;
  userDetailForm!: FormGroup;

  tabs = [
    { title: 'Detalhes', content: UserTabDetailsComponent},
    { title: 'Configurações', content: UserTabConfigComponent}
  ];

  constructor(
    private fb: FormBuilder, 
    private userService: UserService,
    private userFormService: UserFormService, 
    private router: Router) {}
  ngOnInit(): void {
    
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobPosition: [''],
      smartPhoneNumber: [''],
      password:['']
    })

    this.userFormService.setUserForm(this.userForm);


  }


  createUser(): void {
    if (this.userForm.valid) {

      const userCreateModel: UserCreateModel = this.userForm.value;
      this.userService.createUser(userCreateModel).subscribe({
        next: (response) => {
          if (response.isSuccess)
            console.log('usuario criado com sucesso!' + response.data)

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
    else {
      console.log('Formulario invalido!!!')
    }

  }

}
