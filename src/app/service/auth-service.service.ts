import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface, LoginInterface } from '../interface/auth-interface';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = `${environment.baseUrl}/xttreme/auth`;

  constructor(private http: HttpClient) { }

  register(data: RegisterInterface) {
    return this.http.post<any>(`${this.url}/register`, data);
  }

  login(data: LoginInterface) {
    return this.http.post<any>(`${this.url}/login`, data);
  }

  resend(email: string) {
    const data = {email};
    return this.http.post<any>(`${this.url}/resend`, data);
  }

  confirmation(token: string) {
    const body = { token };
    return this.http.post<any>(`${this.url}/confirmation`, body);
  }

  forgetPassword(email: string) {
    const data = { email };
    return this.http.post<any>(`${this.url}/send_link`, data);
  }

  resetPassword(password, id) {
    const body = {password, id};
    return this.http.post<any>(`${this.url}/reset_password`, body);
  }
}
