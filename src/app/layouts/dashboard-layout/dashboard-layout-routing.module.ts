import { ItemsComponent } from './../../pages/items/items.component';
import { CategoryComponent } from './../../pages/category/category.component';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/pages/dashboard/dashboard.component';
import { CreateCategoryComponent } from 'src/app/pages/create-category/create-category.component';
import { CreateItemComponent } from 'src/app/pages/create-item/create-item.component';


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
    path: 'items', component: ItemsComponent
  },
  {
    path: 'create-item', component: CreateItemComponent
  }
];

