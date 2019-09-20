import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthServiceService } from './service/auth-service.service';
import { ComponentsModule } from './components/components.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './core/interceptors/interceptor.jwt';
import { DashboardService } from './service/dashboard.service';
import { ToastrModule } from 'ng6-toastr-notifications';
import { DecimalPipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ComponentsModule,
    RouterModule,
    NgbModule,
    ToastrModule,
    BrowserAnimationsModule,
    MatCheckboxModule
  ],
  providers: [
    AuthServiceService,
    DashboardService,
    DecimalPipe,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
