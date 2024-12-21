import {CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";
import { ToastService } from "../../../shared/toastr-services/toast-service";

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate{
   
   
  
   constructor(private authService: AuthService, private router: Router, private toastService: ToastService) {

   }
   
    canActivate(): boolean {
        if(this.authService.isAuthenticated()){
            //this.toastService.showSuccess('Guard','acesso autorizado')
            return true;
        }else{
            this.router.navigate(['/login'])
            //this.toastService.showErro('Guard','acesso nao autorizado')
            return false;
        }
    }

}