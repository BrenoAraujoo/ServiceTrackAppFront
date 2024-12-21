import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/auth/services/auth.service';
import { LoginModel } from '../models/login.model';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastService } from '../../shared/toastr-services/toast-service';
import { Router } from '@angular/router';


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
    private _toastService: ToastService,
    private _router: Router ) {


  }
  ngOnInit(): void {

 
    this.loginForm = this._fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    if(this._authService.isAuthenticated())
      this._router.navigate(['/users'])
    else
      this.refresh();

  }

  login():void {

    if (this.loginForm.valid) {
      const loginModel: LoginModel = this.loginForm.value;

      this._authService.login(loginModel).subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.accessToken) {
            console.log(response.data?.accessToken);
            this._toastService.showSuccess('Sucesso', 'Acesso autorizado')
            this._authService.storeToken(response.data?.accessToken, response.data?.refreshToken)
            this._router.navigate(['/users'])
          }
        },
        error: (err) => {
          if (err.error) {
            const errorResponse = err.error;
            console.log(errorResponse.message);
            this._toastService.showErro('Erro', errorResponse.message)
          }
        }
      });
    }
    else{
      this._toastService.showErro('erro', 'Formulario login invalido');
    }

  }

  refresh():void {


      this._authService.refreshAccessToken().subscribe({
        next: (response) => {
          if (response.isSuccess && response.data?.accessToken) {
            this._toastService.showSuccess('refresh login sucesso', response.data?.accessToken)
            this._authService.storeToken(response.data?.accessToken, response.data?.refreshToken)
            this._router.navigate(['/users'])
          }
        },
        error: (err) => {
          if (err.error) {
            const errorResponse = err.error;
            this._authService.removeRefreshToken();
            this._authService.removeToken();

          }
        }
      });
  }
}
