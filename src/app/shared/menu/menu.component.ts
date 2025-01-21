import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule, ToastModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  constructor(private router: Router, private sideBarSerivce: SidebarService, private authService: AuthService) { };

  ngOnInit() {
    this.items = [
      { 
        label: 'Agenda',
        items: [
          {
            label: 'Agenda',
            icon: 'pi pi-book'
          }
        ]
      },
      {
        label: 'Cadastros',
        items: [
          {
            label: 'Usuários',
            icon: 'pi pi-user-plus',
            command: () => this.router.navigate(['/users']).then(() => {
              this.sideBarSerivce.closeSidebar();
            })
          },
          {
            label: 'Tipos de Tarefas',
            icon: 'pi pi-wrench',
            command: () => this.router.navigate(['/taskType']).then(() => {
              this.sideBarSerivce.closeSidebar();
            })
          }
        ]
      },
      {
        label: 'Relatórios',
        items: [
          {
            label: 'Tarefas',
            icon: 'pi pi-list-check',
            command: () => this.router.navigate(['/task']).then(() => {
              this.sideBarSerivce.closeSidebar();
            })
          }
        ]
      },
      {
        label: 'Configurações',
        items: [
          {
            label: 'Configurações',
            icon: 'pi pi-cog'
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out',
            command: () => this.router.navigate(['login']).then(() => {
              this.authService.logout();
              this.sideBarSerivce.closeSidebar();
            })
          }
        ]
      }
    ];
  }
}
