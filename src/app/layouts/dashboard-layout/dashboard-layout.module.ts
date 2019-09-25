import { UpdateCategoryComponent } from './../../pages/category/update-category/update-category.component';
import { CategoryComponent } from './../../pages/category/category.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClipboardModule } from 'ngx-clipboard';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { DashboardLayoutRoutes } from './dashboard-layout-routing.module';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCategoryComponent } from 'src/app/pages/category/create-category/create-category.component';
import { ItemsComponent } from 'src/app/pages/items/items.component';
import { CreateItemComponent } from 'src/app/pages/items/create-item/create-item.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { UpdateItemComponent } from 'src/app/pages/items/update-item/update-item.component';
import { AudutTrailComponent } from 'src/app/pages/audut-trail/audut-trail.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';


@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    ItemsComponent,
    CreateItemComponent,
    UpdateItemComponent,
    AudutTrailComponent,
    UserManagementComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardLayoutRoutes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ClipboardModule,
    ToastrModule.forRoot(),
  ]
})
export class DashboardLayoutModule { }
