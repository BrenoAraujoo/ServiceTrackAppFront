import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-services/user.service';
import { Router } from '@angular/router';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { User } from '../../models/user/user.model';
import { ApiResponse } from '../../models/api-response/api-response.model';
import { ToastService } from '../../../services/toastr-services/toast-service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [SharedModuleModule],
  standalone: true
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  errorMessage: string = '';
  totalUsers: number = 0;
  currentUsers: number = 0;

  constructor(
    private userService: UserService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.getUsers();

  }

  viewUser(userId: string): void {
    this.router.navigate([`/users/${userId}`]);  // Redireciona para a rota com o ID do usuário
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
    });
  }

  onPageChange(event: any) {
    const currentPage = Math.floor(event.first / event.rows) + 1


    this.toastService.showInfo("teste", `Botão ${currentPage} clicado`)
  }

  getUsers(event?: any) {
    const pageNumber = event ? (event.first / event.rows) + 1 : 1;
    const pageSize = event ? event.rows : 5;
    this.userService.getUsers(pageNumber, pageSize).subscribe({
      next: (response) => {
        if (response.isSuccess && response.data != null) {
          this.users = response.data?.entityList;
          this.totalUsers = response.data?.totalItems;
        }
      },
      error: (err) => {
        this.toastService.showErro('teste', err.message)
      }
    })
  }
}
