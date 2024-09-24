import { Component, OnInit } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { SidebarService } from './sidebar.service';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, MenuComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  constructor(private router: Router, private sideBarService: SidebarService) { };

  sidebarVisible: boolean = false;


  ngOnInit(): void {
    this.sideBarService.sidebarClosed$.subscribe(()=>{
      this.closeSideBar();
    })
  };

  closeSideBar(): void{
    this.sidebarVisible = false;
    console.log('Sidebar fechado: ' + this.sidebarVisible);
  }
}



