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

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  register(data: RegisterInterface) {
    return this.http.post<any>(`${this.url}/register`, data);
  }

  login(data: LoginInterface) {
    return this.http.post<any>(`${this.url}/login`, data).pipe(map(user => {
      console.log(user.data);
      if (user && user.data.tokenData.token) {
        localStorage.setItem('currentUser', JSON.stringify(user.data));
      }
      return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
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

  redirectToAccessDeniedPageWithData() {
    this.router.navigate(AuthServiceService.accessDeniedRoute);
  }

  get isAdmin(): boolean {
    return this.currentUserValue.result.role;
  }
}
