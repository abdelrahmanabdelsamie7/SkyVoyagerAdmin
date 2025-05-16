export interface Hotel {
  id: string;
  title: string;
  image_cover?: File;
  price_per_night: number;
  dinner_option: boolean;
  ac_option: boolean;
  hot_tub_option: boolean;
  num_of_beds: number;
  description: string;
  location: string;
}
