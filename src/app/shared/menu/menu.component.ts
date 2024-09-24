import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { ToastModule } from 'primeng/toast';
import { SidebarService } from '../sidebar/sidebar.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenuModule, ToastModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements OnInit {
  items: MenuItem[] | undefined;
  
  constructor(private router: Router, private sideBarSerivce: SidebarService){};

  ngOnInit() {
      this.items = [
          {
              label: 'Usuários',
              items: [
                  {
                      label: 'New',
                      icon: 'pi pi-plus',
                      command: () => this.router.navigate(['/users']).then(()=>{
                        this.sideBarSerivce.closeSidebar();
                      })
                  },
                  {
                      label: 'Search',
                      icon: 'pi pi-search',
                      command: () => this.router.navigate(['users/1']).then(()=> {
                        this.sideBarSerivce.closeSidebar(); 
                      })
                  }
              ]
          },
          {
              label: 'Profile',
              items: [
                  {
                      label: 'Settings',
                      icon: 'pi pi-cog'
                  },
                  {
                      label: 'Logout',
                      icon: 'pi pi-sign-out'
                  }
              ]
          }
      ];
  }
}
