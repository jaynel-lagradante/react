import { Movie } from "./movie";

export interface Booking {
  id: string;
  movieId: string;
  username: string;
  seatNumbers: number[];
}

export interface BookingItemProps {
  booking: Booking;
  movie: Movie | undefined;
}
