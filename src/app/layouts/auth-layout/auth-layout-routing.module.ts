import { LoginComponent } from './../../pages/login/login.component';
import { Routes } from '@angular/router';
import { ErrorComponent } from 'src/app/pages/error/error.component';
import { ConfirmationComponent } from 'src/app/pages/confirmation/confirmation.component';


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
    path: 'confirmation/:token',    component: ConfirmationComponent
  },
  {
    path: '**', component: ErrorComponent
  }
];


