import { AuthServiceService } from './../../service/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {
  filter = new FormControl('');
  users;
  constructor(private service: AuthServiceService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.service.listUsers().subscribe((data: any) => {
      if (data) {
        this.users = data.data;
        console.log(data.data);

      }
    });
  }

}
