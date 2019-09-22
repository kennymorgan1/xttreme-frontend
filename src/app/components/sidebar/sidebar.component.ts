import { AuthServiceService } from './../../service/auth-service.service';
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
  { path: '/items', title: 'Items', icon: 'm-menu__link-icon flaticon-layers', class: ''},
  { path: '/audit-trail', title: 'Audit Trail', icon: 'm-menu__link-icon flaticon-layers', class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  public menuItems: any[];
  public isCollapsed = true;
  allMenus = [
    { path: '/category', title: 'Category', icon: 'm-menu__link-icon flaticon-layers', class: 'm-menu__ver-arrow la la-angle-right'},
    { path: '/items', title: 'Items', icon: 'm-menu__link-icon flaticon-layers', class: 'm-menu__ver-arrow la la-angle-right'},
    this.auditTrailMenu(),
    this.userManagementMenu()
  ];

  constructor(
    private router: Router,
    private authService: AuthServiceService) { }

  auditTrailMenu() {
    if (this.authService.isAdmin) {
      return {
        path: '/audit-trail', title: 'Audit Trail', icon: 'm-menu__link-icon flaticon-layers', class: 'm-menu__ver-arrow la la-angle-right'
      };
    }
  }

  userManagementMenu() {
    if (this.authService.isAdmin) {
      return {
        path: '/users', title: 'User Management', icon: 'm-menu__link-icon flaticon-layers', class: 'm-menu__ver-arrow la la-angle-right'
      };
    }
  }

}
