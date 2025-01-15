import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new BehaviorSubject<boolean>(false); // Estado inicial do spinner (oculto)
  public readonly  loading$ = this._loading.asObservable(); // Retorna um observable para o spinner

  show():void{
    this._loading.next(true);
  }
  hide():void{
    this._loading.next(false);
  }

}
