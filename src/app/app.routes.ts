import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NotFoundComponent } from './admin/shared/not-found/not-found.component';
import { OfferComponent } from './admin/offer/offer.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { PopularPlaceComponent } from './admin/popular-place/popular-place.component';
import { FlightScheduleComponent } from './admin/offer/flight-schedule/flight-schedule.component';
import { WelcomeComponent } from './admin/shared/welcome/welcome.component';
import { adminGuard } from './core/guards/admin.guard';
import { LoginComponent } from './admin/shared/login/login.component';
import { ShowOfferComponent } from './admin/offer/show-offer/show-offer.component';
import { BookingHotelsComponent } from './admin/bookins/booking-hotels/booking-hotels.component';
import { BookingOffersComponent } from './admin/bookins/booking-offers/booking-offers.component';

export const routes: Routes = [

  { path: 'login', component: LoginComponent, title: 'Admin Login' },
  { path: '', redirectTo: '/dashboard/welcome', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Admin Dashboard',
    canActivate: [adminGuard],
    children: [
      { path: 'welcome', component: WelcomeComponent, title: 'Admin | Welcome Page' },
      { path: 'offers', component: OfferComponent, title: 'Admin | Offers' },
      { path: 'offer-details/:id', component: ShowOfferComponent, title: 'Admin | Offer Detasils' },
      { path: 'hotels', component: HotelComponent, title: 'Admin | Hotels' },
      { path: 'popular-places', component: PopularPlaceComponent, title: 'Admin | Popular Places' },
      { path: 'flight-schedules', component: FlightScheduleComponent, title: 'Admin | Flight Schedules' },
      { path: 'booking-hotels', component: BookingHotelsComponent, title: 'Admin | Booking Hotels' },
      { path: 'booking-offers', component: BookingOffersComponent, title: 'Admin | Booking Offer' },
    ]
  },

  { path: '**', component: NotFoundComponent }
];
