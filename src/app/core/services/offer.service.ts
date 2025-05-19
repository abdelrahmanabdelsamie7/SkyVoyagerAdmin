
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Offer } from '../interfaces/offer';
import { environment } from '../../../environments/environment.development';
import { OfferImage } from '../interfaces/offer-image';
@Injectable({
  providedIn: 'root'
})
export class OfferService {

  constructor(private _HttpClient: HttpClient) { }
  listOffers(): Observable<Offer[]> {
    return this._HttpClient.get<Offer[]>(`${environment.baseUrl}/offers`);
  }
  addOffer(offer: FormData): Observable<Offer> {
    return this._HttpClient.post<Offer>(`${environment.baseUrl}/offers`, offer, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
  showOffer(id: string): Observable<Offer> {
    return this._HttpClient.get<Offer>(`${environment.baseUrl}/offers/${id}`);
  }
  editOffer(id: string, offer: FormData): Observable<Offer[]> {
    return this._HttpClient.post<Offer[]>(`${environment.baseUrl}/offers/${id}`, offer, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
  deleteOffer(id: string): Observable<Offer> {
    return this._HttpClient.delete<Offer>(`${environment.baseUrl}/offers/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
  addImageOffer(offerImage: FormData): Observable<OfferImage> {
    return this._HttpClient.post<OfferImage>(`${environment.baseUrl}/offer-images`, offerImage, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
  deleteImageOffer(id: string): Observable<void> {
    return this._HttpClient.delete<void>(`${environment.baseUrl}/offer-images/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') } });
  }
}
