import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { BookingOffer } from '../../../core/interfaces/booking-offer';
import { BookingService } from '../../../core/services/booking.service';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { EmptyComponent } from "../../shared/empty/empty.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-offers',
  standalone: true,
  imports: [LoadingComponent, EmptyComponent, CommonModule],
  templateUrl: './booking-offers.component.html',
  styleUrl: './booking-offers.component.css'
})
export class BookingOffersComponent implements OnInit {
  BookingsOffer = signal<BookingOffer[]>([]);
  isFetching = signal<boolean>(false);
  constructor(
    private _BookingOfferService: BookingService,
    private _DestroyRef: DestroyRef
  ) { }
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this._BookingOfferService.listBookingOffers().subscribe({
      next: (resp: any) => {
        this.BookingsOffer.set(resp.data);
        this.isFetching.set(false);
      }
    });
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
