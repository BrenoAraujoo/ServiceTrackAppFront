import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user-services/user.service';
import { Router } from '@angular/router';
import { SharedModuleModule } from '../../../shared/shared-module/shared-module.module';
import { User } from '../../models/user/user.model';
import { ApiResponse } from '../../models/api-response.model';
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

  constructor(
    private userService: UserService,
     private router: Router) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((response: ApiResponse<User>) => {

      if (response.isSuccess && response.data != null) {
        this.users = Array.isArray(response.data) ? response.data : [response.data];
      } else {
        console.log('erro-> ' + response.error)
      }

    });
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
    return active ? 'success' : 'danger';
  }

  changeUserStatus(userId: string, status: boolean) {
    this.userService.changeUserStatus(userId, status).subscribe({
      next: (response: ApiResponse<void>) => {
        if (response.isSuccess) {
          console.log(`${status ? 'Ativação' : 'Desativação'} do usuário bem sucedida`);
  
          // Atualiza a lista de usuários de forma imutável
          this.users = this.users.map(user => 
            user.id === userId ? { ...user, active: status } : user
          );
        } else {
          console.log('Erro da API: ', response.error?.code, response.error?.message);
        }
      },
      error: (err) => {
        console.log(`${status ? 'Ativação' : 'Desativação'} do usuário não foi efetuada`, err);
      }
    });
  }
  
}
