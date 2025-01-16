import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { User } from '../../models/user.model';
import { ApiResponse } from '../../../core/api-response/api-response.model';
import { ToastService } from '../../../shared/toastr-services/toast-service';
import { Observable, Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PaginatedApiResponse } from '../../../core/api-response/api-paginated-response.model';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [SharedModuleModule],
  standalone: true
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  errorMessage: string = '';
  totalUsers: number = 0;
  currentUsers: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.getUsers();

  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  viewUser(userId: string): void {
    this.router.navigate([`/users/${userId}`]); 
  }


  createUser(): void {
    this.router.navigate(['/users/create'])
  }

  getUserStatus(user: User): string {
    return user.active ? 'ativo' : 'inativo';
  }

  userStatusColor(active: boolean) {
    return active ? "success" : "danger";
  }

  changeUserStatus(userId: string, status: boolean) {

    this.subscription.add(
      this.userService.changeUserStatus(userId, status).subscribe({
        next: (response: ApiResponse<void>) => {
          if (response.isSuccess) {

            this.toastService.showSuccess('Alteração de usuário', ` Usuário ${status ? 'ativado' : 'desativado'} com sucesso`)

            // Atualiza a lista de usuários de forma imutável
            this.users = this.users.map(user =>
              user.id === userId ? { ...user, active: status } : user
            );
          }
        },
        error: (err) => {
          this.toastService.showWarnig('Alteração de usuário', ` ${err.message}`)
        }
      }));
  }

  getUsers(event?: any) {
    const pageNumber = event ? (event.first / event.rows) + 1 : 1;
    const pageSize = event ? event.rows : 5;

    this.subscription.add(
      this.userService.getUsers(pageNumber, pageSize).subscribe({
        next: (response) => {
          if (response.isSuccess && response.data != null) {
            this.users = response.data?.entityList;
            this.totalUsers = response.data?.totalItems;
          }
        },
        error: (err: HttpErrorResponse) => {
          this.toastService.showErro('Erro ao obter os usuários', err.message)
        }
      })
    )
  }
}
