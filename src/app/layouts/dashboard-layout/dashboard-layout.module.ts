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


@NgModule({
  declarations: [
    DashboardComponent,
    CategoryComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    ItemsComponent,
    CreateItemComponent,
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
