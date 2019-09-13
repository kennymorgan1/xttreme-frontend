import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RegisterInterface, LoginInterface, User } from '../interface/auth-interface';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  static accessDeniedRoute = ['/access-denied'];
  static peopleInMyOrg: any[] = [];
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  url = `${environment.baseUrl}/xttreme/auth`;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  register(data: RegisterInterface) {
    return this.http.post<any>(`${this.url}/register`, data);
  }

  login(data: LoginInterface) {
    return this.http.post<any>(`${this.url}/login`, data)
    .pipe(map(status => {
      if (status && status.token) {
        const user = new User();
        user.firstName = status.secret.firstName;
        user.lastName = status.secret.lastName;
        user.email = status.secret.email;
        user.id = user.id;
        user.token = user.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
      }
    }));
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
