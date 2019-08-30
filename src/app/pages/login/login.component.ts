import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authType: String = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      console.log(this.authType);
    });
  }

}
