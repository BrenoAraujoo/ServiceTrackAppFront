import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-services/user.service';
import { ActivatedRoute } from '@angular/router';

import { UserCreateModel } from '../../models/user/user-create.model';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';

import { UserTabDetailsComponent } from '../user-tab-details/user-tab-details.component';
import { UserTabConfigComponent } from '../user-tab-config/user-tab-config.component';
import { UserFormService } from '../../../services/user-services/user-form.service';
import { passwordMatchValidator } from './PasswordMatchValidator';
import { ApiResponse } from '../../models/api-response.model';
import { User } from '../../models/user/user.model';
import { ToastService } from '../../../services/toastr-services/toast-service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './user-create-edit.component.html',
  styleUrl: './user-create-edit.component.scss'
})
export class UserCreateComponent implements OnInit {

  userForm!: FormGroup;
  userId: string | null = null;
  isEditMode: boolean = false;

  tabs = [
    { title: 'Detalhes', content: UserTabDetailsComponent },
    { title: 'Configurações', content: UserTabConfigComponent }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userFormService: UserFormService,
    private route: ActivatedRoute,
    private toastService: ToastService) { }
  ngOnInit(): void {

    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobPosition: [''],
      smartPhoneNumber: [''],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      userRole: ['', Validators.required]
    }, { validators: passwordMatchValidator() })

    //Seta o userForm para que os componentes 'tabs' possam acessar esse form
    this.userFormService.setUserForm(this.userForm);

    this.route.paramMap.subscribe(params => {

      this.userId = params.get('id');
      this.isEditMode = this.userId != null;

      if (this.isEditMode && this.userId) {
        this.userService.getUserById(this.userId).subscribe((response: ApiResponse<User>) => {
          if (response.isSuccess && response.data != null) {
            this.userForm.patchValue({
              name: response.data.name,
              email: response.data.email,
              jobPosition: response.data.jobPosition,
              smartPhoneNumber: response.data.smartPhoneNumber,
              userRole: response.data.userRole
            })
          }
        });
      }
    })
  }

  createUser(): void {


    if (this.userForm.valid) {

      const userCreateModel: UserCreateModel = this.userForm.value;

      this.userService.createUser(userCreateModel).subscribe({
        next: (response) => {
          if (response.isSuccess)
            this.toastService.showSuccess('Criação de usuário', 'Usuário criado com sucesso!')
        },
        error: (err) => {
          console.error('Erro na requisição:', err);
          if (err.error) {

            const errorResponse = err.error;
            this.toastService.showErro('Erro na criação de usuário', `Codigo: ${errorResponse.code} - Mensagem: ${errorResponse.message}`)
          } else {
            this.toastService.showErro('Erro na criação de usuário', err)
          }
        }
      });
    }
    else {
      this.toastService.showWarnig('Criação de usuário', 'Dados inválidos')
    }

  }

  saveUser(): void {
    console.log('usuário salvo!')
    console.log(this.userForm.get('userRole')?.value)
    console.log(this.userForm.get('smartPhoneNumber')?.value)
  }

}
