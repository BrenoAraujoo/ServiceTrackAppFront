import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';


export const routes: Routes = [
    { path: 'users', component: UserListComponent },  // Lista de usuários
    { path: 'users/:id', component: UserDetailComponent },  // Detalhes do usuário por ID
    { path: '', redirectTo: '/users', pathMatch: 'full' }  // Redireciona para a lista de usuários por padrão
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
