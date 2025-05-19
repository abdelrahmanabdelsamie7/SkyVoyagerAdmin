import { Component, DestroyRef, OnInit, signal } from '@angular/core';
import { BookingHotel } from '../../../core/interfaces/booking-hotel';
import { BookingService } from '../../../core/services/booking.service';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from "../../shared/loading/loading.component";
import { EmptyComponent } from "../../shared/empty/empty.component";

@Component({
  selector: 'app-booking-hotels',
  standalone: true,
  imports: [CommonModule, LoadingComponent, EmptyComponent],
  templateUrl: './booking-hotels.component.html',
  styleUrl: './booking-hotels.component.css'
})
export class BookingHotelsComponent  implements OnInit {
  BookingsHotel = signal<BookingHotel[]>([]);
  isFetching = signal<boolean>(false);

  constructor(
    private _BookingHotelService: BookingService,
    private _DestroyRef: DestroyRef
  ) { }
  ngOnInit(): void {
    this.isFetching.set(true);
    const subscription = this._BookingHotelService.listBookingHotels().subscribe({
      next: (resp: any) => {
        this.BookingsHotel.set(resp.data);
        this.isFetching.set(false);

      }
    });
    this._DestroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
