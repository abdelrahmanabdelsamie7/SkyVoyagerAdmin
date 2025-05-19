import { Offer } from "./offer";

export interface FlightSchedule {
  id: string;
  offer_id: string;
  departure_city: string;
  departure_time: string;
  arrival_city: string;
  arrival_time: string;
  price_multiplier: number;
  calculated_price: number;
  offer ?: Offer
}
