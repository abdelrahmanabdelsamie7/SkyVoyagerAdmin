import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { BookingHotel } from '../interfaces/booking-hotel';
import { BookingOffer } from '../interfaces/booking-offer';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

   constructor(private _HttpClient: HttpClient) { }
    listBookingHotels(): Observable<BookingHotel[]> {
      return this._HttpClient.get<BookingHotel[]>(`${environment.baseUrl}/booking-hotel`,{headers : { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') }});
    }
    addBookingHotel(BookingHotel: FormData): Observable<BookingHotel> {
      return this._HttpClient.post<BookingHotel>(`${environment.baseUrl}/booking-hotel`, BookingHotel, { headers: { Authorization: 'Bearer ' + localStorage.getItem('userSkyVouagerToken') } });
    }
    deleteBookingHotel(id: string): Observable<BookingHotel> {
      return this._HttpClient.delete<BookingHotel>(`${environment.baseUrl}/booking-hotel/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('userSkyVouagerToken') } });
    }
    listBookingOffers(): Observable<BookingOffer[]> {
      return this._HttpClient.get<BookingOffer[]>(`${environment.baseUrl}/booking-offer`,{headers : { Authorization: 'Bearer ' + localStorage.getItem('adminSkyVoyager') }});
    }
    addBookingOffer(BookingOffer: FormData): Observable<BookingOffer> {
      return this._HttpClient.post<BookingOffer>(`${environment.baseUrl}/booking-offer`, BookingOffer, { headers: { Authorization: 'Bearer ' + localStorage.getItem('userSkyVouagerToken') } });
    }
    deleteBookingOffer(id: string): Observable<BookingOffer> {
      return this._HttpClient.delete<BookingOffer>(`${environment.baseUrl}/booking-offer/${id}`, { headers: { Authorization: 'Bearer ' + localStorage.getItem('userSkyVouagerToken') } });
    }
}
