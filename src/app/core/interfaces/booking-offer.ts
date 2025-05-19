import { FlightSchedule } from "./flight-schedule";
import { Offer } from "./offer";
import { User } from "./user";

export interface BookingOffer {
  id: string;
  user_id: string;
  offer_id: string;
  total_price: number;
  num_of_tickets: number;
  user: User ;
  offer: Offer;
  schedule: FlightSchedule;
}
