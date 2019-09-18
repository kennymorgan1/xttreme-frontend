import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url = `${environment.baseUrl}/xttreme`;
  user;

  constructor(private http: HttpClient) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
   }

   appendAuthHeader(): any {
    return {
      headers: {
        Authorization: `Bearer ${this.user.tokenData.token}`
      }
    };
  }

  createCategory(data: any) {
    return this.http.post<any>(`${this.url}/category`, data, this.appendAuthHeader());
  }

  listCategories(offset, limit) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<any>(`${this.url}/category`, this.appendAuthHeader());
  }

  updateCategory(data: any, id: string) {
    return this.http.put<any>(`${this.url}/category/${id}`, data, this.appendAuthHeader());
  }

  getOneCategory(id: string) {
    return this.http.get<any>(`${this.url}/category/${id}`, this.appendAuthHeader());
  }

  createItem(data: any) {
    return this.http.post<any>(`${this.url}/item`, data, this.appendAuthHeader());
  }

  listItems(offset, limit) {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<any>(`${this.url}/item`, this.appendAuthHeader());
  }
}
