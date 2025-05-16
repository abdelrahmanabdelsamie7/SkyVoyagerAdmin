import { Routes } from '@angular/router';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { NotFoundComponent } from './admin/shared/not-found/not-found.component';
import { OfferComponent } from './admin/offer/offer.component';
import { HotelComponent } from './admin/hotel/hotel.component';
import { PopularPlaceComponent } from './admin/popular-place/popular-place.component';

export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Admin Dashboard',
    children: [
      { path: 'offers', component: OfferComponent, title: 'Admin | Offers' },
      { path: 'hotels', component: HotelComponent, title: 'Admin | Hotels' },
      { path: 'popular-places', component: PopularPlaceComponent, title: 'Admin | Popular Places' },
    ]
  },

  { path: '**', component: NotFoundComponent }
];
