import { Component} from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CommonModule } from '@angular/common';
import { LoadingService } from '../../core/auth/services/loading.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  standalone: true,
  imports:[ProgressSpinnerModule,CommonModule]
})
export class LoadingSpinnerComponent{

  loading$: Observable<boolean>;
  
  constructor(private _loadingService: LoadingService){
    this.loading$ = _loadingService.loading$;
  };
  

}
