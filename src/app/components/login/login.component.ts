import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { LoginModel } from '../models/auth/login.model';
import { SharedModuleModule } from '../../shared/shared-module/shared-module.module';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SharedModuleModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginModel!: LoginModel;

  constructor(private authService: AuthService) {

    
  }

  login():void {

    const   loginModel: LoginModel = {
      email: 'bianca@gmail.com',
      password: 'Bianca@123123' 
    };

    this.authService.login(loginModel).subscribe({
      next: (response) => {
        if(response.isSuccess)
          console.log(response.data?.accessToken)
      },
      error: (err)=>{
        if(err.error){
          const errorResponse = err.error;
          console.log(errorResponse.message)
        }
      }
    });
  }
}
