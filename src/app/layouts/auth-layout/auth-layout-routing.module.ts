import { LoginComponent } from './../../pages/login/login.component';
import { Routes } from '@angular/router';


export const AuthLayoutRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: LoginComponent
  },
  {
    path: 'forget-password', component: LoginComponent
  }
];


