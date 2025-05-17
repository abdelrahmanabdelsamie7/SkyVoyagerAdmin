import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admin } from '../interfaces/admin';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private _HttpClient: HttpClient) { }
  adminLogin(admin: Admin): Observable<Admin> {
    return this._HttpClient.post<Admin>(`${environment.baseUrl}/admin/login`, admin);
  }
  adminAccount(): Observable<Admin> {
    return this._HttpClient.get<Admin>(`${environment.baseUrl}/admin/getaccount`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
}
