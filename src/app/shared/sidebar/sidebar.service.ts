import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarClosedSource = new Subject<void>();
  sidebarClosed$ = this.sidebarClosedSource.asObservable();

  closeSidebar() {
    this.sidebarClosedSource.next();
  }
}
