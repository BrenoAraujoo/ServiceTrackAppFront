import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from '../menu/menu.component';
import { NavigationEnd, Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, MenuComponent, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  constructor(private router: Router, private sideBarService: SidebarService) { };

  sidebarVisible: boolean = false;
  showMenu: boolean  = false;

  ngOnInit(): void {
    
    this.sideBarService.sidebarClosed$.subscribe(()=>{
      this.closeSideBar();
    })


    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Esconde o menu na rota '/login'
        if (event.url === '/login' || event.urlAfterRedirects === '/login') {
          this.showMenu = false;
        } else {
          this.showMenu = true;
        }
      }
    });
  };

  closeSideBar(): void{
    this.sidebarVisible = false;
  }
}



