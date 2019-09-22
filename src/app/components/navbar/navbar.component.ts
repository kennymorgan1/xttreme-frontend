import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticationService: AuthServiceService,
    private router: Router
  ) { }

  logout() {
    if (this.authenticationService.currentUserValue) {
      this.authenticationService.logout();
    }
    this.router.navigate(['/login']);
  }

  ngOnInit() {
  }

}
