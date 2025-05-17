import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FlightSchedule } from '../interfaces/flight-schedule';

@Injectable({
  providedIn: 'root'
})
export class FlightScheduleService {

  constructor(private _HttpClient: HttpClient) { }
  listFlightSchedules(): Observable<FlightSchedule[]> {
    return this._HttpClient.get<FlightSchedule[]>(`${environment.baseUrl}/flight-schedules`);
  }
  addFlightSchedule(FlightSchedule: FormData): Observable<FlightSchedule> {
    return this._HttpClient.post<FlightSchedule>(`${environment.baseUrl}/flight-schedules`, FlightSchedule);
  }
  showFlightSchedule(id: string): Observable<FlightSchedule> {
    return this._HttpClient.get<FlightSchedule>(`${environment.baseUrl}/flight-schedules/${id}`);
  }
  editFlightSchedule(id: string, FlightSchedule: FormData): Observable<FlightSchedule[]> {
    return this._HttpClient.post<FlightSchedule[]>(`${environment.baseUrl}/flight-schedules/${id}`, FlightSchedule);
  }
  deleteFlightSchedule(id: string): Observable<FlightSchedule> {
    return this._HttpClient.delete<FlightSchedule>(`${environment.baseUrl}/flight-schedules/${id}`);
  }
}
