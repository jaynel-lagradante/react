export interface Movie {
  id: number;
  title: string;
  description: string;
  showtime: string;
  totalSeats: number;
  bookedSeats: number[];
}

export interface MovieCardProps {
  movie: Movie;
  onBook: (movieId: number, selectedSeats: number[]) => void;
}
