import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { DashboardLayoutRoutes } from './dashboard-layout-routing.module';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardLayoutRoutes),
    NgbModule
  ]
})
export class DashboardLayoutModule { }
