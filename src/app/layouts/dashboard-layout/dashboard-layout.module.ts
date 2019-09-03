import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { DashboardLayoutRoutes } from './dashboard-layout-routing.module';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardLayoutRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
  ]
})
export class DashboardLayoutModule { }
