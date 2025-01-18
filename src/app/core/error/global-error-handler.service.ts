import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../../shared/toastr-services/toast-service';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private _toastService: ToastService) { }
  handleError(error: any): void {
    console.log(error.error?.error?.message)

    if(error.error !== null && error?.isSuccess){
      this._toastService.showErro(`Erro`, `Código: ${error.error.code} - ${error.error.message}`);
      return;
    }
    switch (error.status) {

      //Navigate to login?
      case 403: this._toastService.showWarning('Acesso negado', `Código: ${error.error?.error?.code} - ${error.error?.error?.message}`); break;
      case 401: this._toastService.showWarning('Não autenticado', `Código: ${error.error?.error?.code} - ${error.error?.error?.message}`); break;
      case 500: this._toastService.showErro(`${error.title}`,`${error.title}`);break;
      default: this._toastService.showErro('Erro', `Código: ${error.error?.error?.code} - ${error.error?.error?.message}`);
    }
  }
}
