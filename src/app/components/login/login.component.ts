import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoginModel } from '../models/auth/login.model';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../services/toastr-services/toast-service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent  implements OnInit{

  loginForm!: FormGroup;
  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _toastService: ToastService) {


  }
  ngOnInit(): void {


    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login():void {

    if (this.loginForm.valid) {
      const loginModel: LoginModel = this.loginForm.value;

      this._authService.login(loginModel).subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.accessToken) {
            console.log(response.data?.accessToken);
            this._toastService.showSuccess('login sucesso', response.data?.accessToken)
          }
        },
        error: (err) => {
          if (err.error) {
            const errorResponse = err.error;
            console.log(errorResponse.message);
            this._toastService.showErro('erro ', errorResponse.message)
          }
        }
      });
    }
    else{
      this._toastService.showErro('erro', 'Formulario login invalido');
    }

  }
}
