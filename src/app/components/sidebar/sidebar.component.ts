import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/category', title: 'Category', icon: 'm-menu__link-icon flaticon-layers', class: ''},
  { path: '/error', title: 'Ahmad', icon: 'm-menu__link-icon flaticon-layers', class: ''},
  { path: '/error', title: 'Drinus', icon: 'm-menu__link-icon flaticon-layers', class: ''},
  { path: '/error', title: 'Mbaye', icon: 'm-menu__link-icon flaticon-layers', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }

}
