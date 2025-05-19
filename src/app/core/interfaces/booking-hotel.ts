import { Hotel } from "./hotel";
import { User } from "./user";

export interface BookingHotel {
    id : string;
    user_id : string;
    hotel_id : string;
    num_of_beds : number;
    check_in_date : string;
    check_out_date : string;
    total_price : number;
    number_of_nights : number;
    user : User
    hotel : Hotel
}
