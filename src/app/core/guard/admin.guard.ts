import { AuthServiceService } from './../../service/auth-service.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';


@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate, CanActivateChild {
    constructor(
        private router: Router,
        private authenticationService: AuthServiceService
    ) {}

    canActivate() {
        if (this.authenticationService.isAdmin) {
            return true;
        } else {
            this.router.navigate(AuthServiceService.accessDeniedRoute);
            return false;
        }
    }

    canActivateChild() {
      if (this.authenticationService.isAdmin) {
          return true;
      } else {
        this.router.navigate(AuthServiceService.accessDeniedRoute);
        return false;
      }
    }
}
