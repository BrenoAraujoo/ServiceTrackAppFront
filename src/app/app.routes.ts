import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { UserCreateComponent } from './components/user/user-create-edit/user-create-edit.component';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './services/auth/AuthGuard.guard';

/**
 * O Angular processa as rotas de acordo com a ordem
 */
export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'users/create',
        component: UserCreateComponent
    }, 
    {
        path: 'users/:id',
        component: UserCreateComponent
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: ([AuthGuard])
    },
    {
        path: '**',
        redirectTo: '/login', pathMatch: 'full'
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
