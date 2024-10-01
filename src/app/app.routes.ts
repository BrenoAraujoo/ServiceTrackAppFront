import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserDetailComponent } from './components/user/user-detail/user-detail.component';
import { UserCreateComponent } from './components/user/user-create/user-create.component';

/**
 * O Angular processa as rotas de acordo com a ordem
 */
export const routes: Routes = [
    { path: 'users/create', component: UserCreateComponent },  // Criar usuário
    { path: 'users/:id', component: UserCreateComponent },  // Criar usuário
    { path: 'users', component: UserListComponent },  // Lista de usuários
    //{ path: 'users/:id', component: UserDetailComponent},  // Detalhes do usuário por ID
    { path: '', redirectTo: '/users', pathMatch: 'full' }  // Redireciona para a lista de usuários por padrão
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
