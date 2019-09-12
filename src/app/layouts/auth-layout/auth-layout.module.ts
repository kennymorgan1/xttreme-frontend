import { ErrorComponent } from './../../pages/error/error.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthLayoutRoutes } from './auth-layout-routing.module';
import { LoginComponent } from './../../pages/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConfirmationComponent } from 'src/app/pages/confirmation/confirmation.component';


@NgModule({
  declarations: [
    LoginComponent,
    ConfirmationComponent,
    ErrorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(AuthLayoutRoutes),
  ]
})
export class AuthLayoutModule { }
