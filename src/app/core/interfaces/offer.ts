export interface Offer {
  id: string;
  title: string;
  image_cover?: File;
  num_of_tickets: number;
  from_date: string;
  to_date: string;
  city: string;
  price_per_ticket: number;
  description: string;
  terms_and_conditions: string;
  created_at: string;
  updated_at: string;
}
