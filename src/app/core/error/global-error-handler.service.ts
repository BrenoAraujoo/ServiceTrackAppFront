import { ErrorHandler, Injectable } from '@angular/core';
import { ToastService } from '../../shared/toastr-services/toast-service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private _toastService: ToastService, private _router: Router) { }
  handleError(error: any): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      this.handleGenericError(error);
    }
  }
  private handleHttpError(error: HttpErrorResponse): void {
    const errorMessage = error.error?.error?.message || error.message || 'Erro desconhecido';
    const errorCode = error.error?.error?.code || error.status;

    switch (error.status) {
      case 400:
        this._toastService.showErro('Erro no envio',`Código: ${errorCode} - ${errorMessage}`);
        break;
      case 401:
        this._toastService.showErro('Não autenticado', `Código: ${errorCode} - ${errorMessage}`);
        this._router.navigate(['/login']);
        break;
      case 403:
        this._toastService.showErro('Acesso negado', `Código: ${errorCode} - ${errorMessage}`);
        break;
      case 500:
        this._toastService.showErro('Erro interno', `Detalhes: ${errorMessage}`);
        break;
      default:
        this._toastService.showErro('Erro', `Código: ${errorCode} - ${errorMessage}`);
        break;
    }
  }

  private handleGenericError(error: any): void {
    console.error('Erro não tratado:', error);
    this._toastService.showErro('Erro inesperado', 'Entre em contato com o suporte');
  }
}
