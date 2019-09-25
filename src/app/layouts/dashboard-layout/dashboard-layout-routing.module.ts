import { UpdateCategoryComponent } from './../../pages/category/update-category/update-category.component';
import { ItemsComponent } from './../../pages/items/items.component';
import { CategoryComponent } from './../../pages/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { CreateCategoryComponent } from 'src/app/pages/category/create-category/create-category.component';
import { CreateItemComponent } from 'src/app/pages/items/create-item/create-item.component';
import { UpdateItemComponent } from 'src/app/pages/items/update-item/update-item.component';
import { AudutTrailComponent } from 'src/app/pages/audut-trail/audut-trail.component';
import { UserManagementComponent } from 'src/app/pages/user-management/user-management.component';
import { AdminGuard } from 'src/app/core/guard/admin.guard';
import { AddUserComponent } from 'src/app/pages/user-management/add-user/add-user.component';


export const DashboardLayoutRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'category', component: CategoryComponent
  },
  {
    path: 'create-category', component: CreateCategoryComponent
  },
  {
    path: 'update-category/:categoryId', component: UpdateCategoryComponent
  },
  {
    path: 'items', component: ItemsComponent
  },
  {
    path: 'create-item', component: CreateItemComponent
  },
  {
    path: 'update-item/:itemId', component: UpdateItemComponent,
  },
  {
    path: 'audit-trail', component: AudutTrailComponent, canActivate: [AdminGuard]
  },
  {
    path: 'users', component: UserManagementComponent, canActivate: [AdminGuard]
  },
  {
    path: 'add-user', component: AddUserComponent,
  }
];

