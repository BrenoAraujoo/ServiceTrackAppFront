import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserCreateModel } from '../../models/user-create.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { UserTabDetailsComponent } from '../user-tab-details/user-tab-details.component';
import { UserTabConfigComponent } from '../user-tab-config/user-tab-config.component';
import { UserFormService } from '../../services/user-form.service';
import { passwordMatchValidator } from '../../../shared/validators/PasswordMatchValidator';
import { ToastService } from '../../../shared/toastr-services/toast-service';
import { UserUpdateModel } from '../../models/user-update.model';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { GlobalErrorHandlerService } from '../../../core/error/global-error-handler.service';

@Component({
  selector: 'app-user-create',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './user-create-edit.component.html',
  styleUrl: './user-create-edit.component.scss'
})
export class UserCreateComponent implements OnInit, OnDestroy {

  userForm!: FormGroup;
  userId: string | null = null;
  isEditMode: boolean = false;
  private subscription: Subscription = new Subscription();

  tabs = [
    { title: 'Detalhes', content: UserTabDetailsComponent },
    { title: 'Configurações', content: UserTabConfigComponent }
  ];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userFormService: UserFormService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private handleErrorService: GlobalErrorHandlerService) { }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.initializeUserForm();
  }

  initializeUserForm(): void {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobPosition: [''],
      smartPhoneNumber: [''],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      role: ['', Validators.required]
    }, { validators: passwordMatchValidator() })

    //Seta o userForm para que os componentes 'tabs' possam acessar esse form
    this.userFormService.setUserForm(this.userForm);
    this.subscription.add(
      this.route.paramMap.subscribe(params => {

        this.userId = params.get('id');
        this.isEditMode = this.userId != null;

        if (this.isEditMode && this.userId) {
          this.userService.getUserById(this.userId).subscribe({

            next: (response) => {
              const { isSuccess, data, error } = response;
              if (!isSuccess && error) {
                this.toastService.showErro('Erro ao encontrar o usuário', error?.message);
              }
              const { name, email, jobPosition, smartPhoneNumber, role } = data!;
              this.userForm.patchValue({
                name,
                email,
                jobPosition,
                smartPhoneNumber,
                role
              })
            },
            error: (err: HttpErrorResponse) => {

              this.handleErrorService.handleError(err);
              this.router.navigate(['/users']);
            }
          });
        }
      })
    )
  }

  createUser(): void {

    if (!this.userForm.valid) {
      this.toastService.showWarning('Criação de usuário', 'Dados inválidos');
      return;
    }

    const userCreateModel: UserCreateModel = this.userForm.value;

    this.subscription.add(
      this.userService.createUser(userCreateModel).subscribe({
        next: (response) => {
          if (response.isSuccess)
            this.toastService.showSuccess('Criação de usuário', 'Usuário criado com sucesso!')
        },
        error: (err) => {
          this.handleErrorService.handleError(err);
        }
      }));
  }

  updateUser(): void {

    const password = this.userForm.get('password')?.value;
    const passwordConfirm = this.userForm.get('passwordConfirm')?.value;

    //Remove os validadores de password caso os campos estejam preenchidos.
    if (!password || !passwordConfirm) {
      this.userForm.get('password')?.clearValidators();
      this.userForm.get('passwordConfirm')?.clearValidators();
    }

    // Remove os validadores dos campos específicos
    this.userForm.get('name')?.clearValidators();
    this.userForm.get('email')?.clearValidators();
    this.userForm.get('role')?.clearValidators();

    // Atualiza a validade e os valores dos campos após remover os validadores
    this.userForm.get('name')?.updateValueAndValidity();
    this.userForm.get('email')?.updateValueAndValidity();
    this.userForm.get('password')?.updateValueAndValidity();
    this.userForm.get('passwordConfirm')?.updateValueAndValidity();
    this.userForm.get('role')?.updateValueAndValidity();

    if (!this.userForm.valid) {
      this.toastService.showWarning('Atualização de usuário', 'Dados inválidos')
      return;
    }
    const userUpdateModel: UserUpdateModel = this.userForm.value;
    this.subscription.add(
      this.userService.updateUser(userUpdateModel, this.userId!).subscribe({
        next: (response) => {
          if (response.isSuccess)
            this.toastService.showSuccess('Atualização de usuário', 'Usuário atualizado com sucesso!')
        },
        error: (err) => {
          this.handleErrorService.handleError(err);
        }
      })
    )
  }

}
