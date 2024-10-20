import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create-edit/user-create-edit.component';
import { LoginComponent } from './components/login/login.component';

/**
 * O Angular processa as rotas de acordo com a ordem
 */
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'users/create', component: UserCreateComponent },  // Criar usuário
    { path: 'users/:id', component: UserCreateComponent },  // Criar usuário
    { path: 'users', component: UserListComponent },  // Lista de usuários
    //{ path: 'users/:id', component: UserDetailComponent},  // Detalhes do usuário por ID
    { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redireciona para a lista de usuários por padrão
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
