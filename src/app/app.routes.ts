import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user/components/user-list/user-list.component';
import { UserCreateComponent } from './user/components/user-create-edit/user-create-edit.component';
import { LoginComponent } from './login/components/login.component';
import { AuthService } from './core/auth/services/auth.service';
import { CanActivate } from '@angular/router';
import { AuthGuard } from './core/auth/guards/AuthGuard.guard';
import { TaskTypeListComponent } from './task-type/components/task-type-list/task-type-list.component';
import { TaskTypeCreateEditComponent } from './task-type/components/task-type-create-edit/task-type-create-edit/task-type-create-edit.component';

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
        component: UserCreateComponent,
        canActivate:([AuthGuard])
    }, 
    {
        path: 'users/:id',
        component: UserCreateComponent,
        canActivate:([AuthGuard])
    },
    {
        path: 'users',
        component: UserListComponent,
        canActivate: ([AuthGuard])
    },
    {
        path: 'taskType',
         component: TaskTypeListComponent
    },
    {
        path: 'taskType/create',
         component: TaskTypeCreateEditComponent
    },
    {
        path: 'taskType/:id',
         component: TaskTypeCreateEditComponent
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
