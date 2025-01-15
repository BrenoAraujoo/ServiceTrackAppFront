import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserCreateModel } from '../../models/user-create.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { UserTabDetailsComponent } from '../user-tab-details/user-tab-details.component';
import { UserTabConfigComponent } from '../user-tab-config/user-tab-config.component';
import { UserFormService } from '../../services/user-form.service';
import { passwordMatchValidator } from '../../../shared/validators/PasswordMatchValidator';
import { ApiResponse } from '../../../core/api-response/api-response.model';
import { User } from '../../models/user.model';
import { ToastService } from '../../../shared/toastr-services/toast-service';
import { UserUpdateModel } from '../../models/user-update.model';

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
          const { isSuccess, data } = response;
          if (isSuccess && data) {
            const { name, email, jobPosition, smartPhoneNumber, userRole } = data;
            this.userForm.patchValue({
              name,
              email,
              jobPosition,
              smartPhoneNumber,
              userRole
            })
          }
        });
      }
    })
  }

  createUser(): void {


    if(!this.userForm.valid){
      this.toastService.showWarnig('Criação de usuário', 'Dados inválidos'); 
      return;
    }

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

  updateUser(): void {

    const password = this.userForm.get('password')?.value;
    const passwordConfirm = this.userForm.get('passwordConfirm')?.value;

    //Remove os validadores de password caso os campos estejam preenchidos.
    if(!password || !passwordConfirm){
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('passwordConfirm')?.clearValidators();
    }
    
    // Remove os validadores dos campos específicos
    this.userForm.get('name')?.clearValidators();
    this.userForm.get('email')?.clearValidators();
    this.userForm.get('userRole')?.clearValidators();
    
    // Atualiza a validade e os valores dos campos após remover os validadores
    this.userForm.get('name')?.updateValueAndValidity();
    this.userForm.get('email')?.updateValueAndValidity();
    this.userForm.get('password')?.updateValueAndValidity();
    this.userForm.get('passwordConfirm')?.updateValueAndValidity();
    this.userForm.get('userRole')?.updateValueAndValidity();
    
    if(this.userForm.valid){
      const userUpdateModel: UserUpdateModel = this.userForm.value; 

      this.userService.updateUser(userUpdateModel, this.userId!).subscribe({
          next: (response) => {
            if(response.isSuccess)
              this.toastService.showSuccess('Atualização de usuário','Usuário atualizado com sucesso!')
          },error: (err) => {
            if(err.error){
              const errorResponse = err.error;
              this.toastService.showErro('Atualização de usuário', `Código: ${errorResponse.code} - Mensagem: ${errorResponse.message}` )
            }
          }
      })
    }else{
        this.toastService.showWarnig('Atualização de usuário','Dados inválidos')
    }
  }

}
