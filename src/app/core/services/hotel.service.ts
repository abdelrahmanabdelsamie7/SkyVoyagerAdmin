import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel';
@Injectable({
  providedIn: 'root'
})
export class HotelService {
  constructor(private _HttpClient: HttpClient) { }
  listHotels(): Observable<Hotel[]> {
    return this._HttpClient.get<Hotel[]>(`${environment.baseUrl}/hotels`);
  }
  addHotel(hotel: FormData): Observable<Hotel> {
    return this._HttpClient.post<Hotel>(`${environment.baseUrl}/hotels`, hotel, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
  showHotel(id: string): Observable<Hotel> {
    return this._HttpClient.get<Hotel>(`${environment.baseUrl}/hotels/${id}`);
  }
  editHotel(id: string, hotel: FormData): Observable<Hotel[]> {
    return this._HttpClient.post<Hotel[]>(`${environment.baseUrl}/hotels/${id}`, hotel, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
  deleteHotel(id: string): Observable<Hotel> {
    return this._HttpClient.delete<Hotel>(`${environment.baseUrl}/hotels/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
}
