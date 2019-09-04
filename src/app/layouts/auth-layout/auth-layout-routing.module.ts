import { LoginComponent } from './../../pages/login/login.component';
import { Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/pages/error/error.component';


export const AuthLayoutRoutes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: LoginComponent
  },
  {
    path: 'forget-password', component: LoginComponent
  },
  {
    path: '**', component: ErrorComponent
  }
];


