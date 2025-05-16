
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../interfaces/offer';
import { environment } from '../../../environments/environment.development';
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _HttpClient: HttpClient) { }
  listOffers(): Observable<Offer[]> {
    return this._HttpClient.get<Offer[]>(`${environment.baseUrl}/offers`);
  }
  addOffer(offer: FormData): Observable<Offer> {
    return this._HttpClient.post<Offer>(`${environment.baseUrl}/offers`, offer);
  }
  showOffer(id: string): Observable<Offer> {
    return this._HttpClient.get<Offer>(`${environment.baseUrl}/offers/${id}`);
  }
  editOffer(id: string, offer: FormData): Observable<Offer[]> {
    return this._HttpClient.post<Offer[]>(`${environment.baseUrl}/offers/${id}`, offer);
  }
  deleteOffer(id: string): Observable<Offer> {
    return this._HttpClient.delete<Offer>(`${environment.baseUrl}/offers/${id}`);
  }
}
