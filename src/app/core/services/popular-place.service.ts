import { PopularPlace } from './../interfaces/popular-place';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopularPlaceService {

  constructor(private _HttpClient: HttpClient) { }
  listPopularPlaces(): Observable<PopularPlace[]> {
    return this._HttpClient.get<PopularPlace[]>(`${environment.baseUrl}/popular-places`);
  }
  addPopularPlace(popularPlace: FormData): Observable<PopularPlace> {
    return this._HttpClient.post<PopularPlace>(`${environment.baseUrl}/popular-places`, popularPlace);
  }
  showPopularPlace(id: string): Observable<PopularPlace> {
    return this._HttpClient.get<PopularPlace>(`${environment.baseUrl}/popular-places/${id}`);
  }
  editPopularPlace(id: string, popularPlace: FormData): Observable<PopularPlace> {
    return this._HttpClient.post<PopularPlace>(`${environment.baseUrl}/popular-places/${id}`, popularPlace);
  }
  deletePopularPlace(id: string): Observable<PopularPlace> {
    return this._HttpClient.delete<PopularPlace>(`${environment.baseUrl}/popular-places/${id}`);
  }
}
