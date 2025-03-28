import React, { createContext, useState, useEffect, useContext } from "react";
import { Movie } from "../types/movie";
import { Booking } from "../types/booking";
import useFetchMovies from "../hooks/useFetchMovies";

interface BookingContextType {
  movies: Movie[];
  bookings: Booking[];
  bookSeats: (
    movieId: number,
    selectedSeats: number[],
    username: string
  ) => void;
  updateBookingSeats: (bookingId: string, newSeatNumbers: number[]) => void;
  cancelBooking: (bookingId: string) => void;
  loadingMovies: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { movies: fetchedMovies, loading: loadingMovies } = useFetchMovies();
  const [movies, setMovies] = useState<Movie[]>(fetchedMovies);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setMovies(fetchedMovies);
  }, [fetchedMovies]);

  const bookSeats = (
    movieId: number,
    selectedSeats: number[],
    username: string
  ) => {
    const movieToBook = movies.find((movie) => movie.id === movieId);
    if (movieToBook) {
      const availableSeats = Array.from(
        { length: movieToBook.totalSeats },
        (_, i) => i + 1
      ).filter((seat) => !movieToBook.bookedSeats.includes(seat));
      const areSeatsAvailable = selectedSeats.every((seat) =>
        availableSeats.includes(seat)
      );

      if (areSeatsAvailable) {
        setMovies((prevMovies) =>
          prevMovies.map((movie) =>
            movie.id === movieId
              ? {
                  ...movie,
                  bookedSeats: [...movie.bookedSeats, ...selectedSeats],
                }
              : movie
          )
        );
        const newBooking: Booking = {
          id: Math.random().toString(36).substring(2, 15),
          movieId,
          username,
          seatNumbers: selectedSeats,
        };
        setBookings((prevBookings) => [...prevBookings, newBooking]);
      } else {
        alert("Some of the selected seats are no longer available.");
      }
    }
  };

  const updateBookingSeats = (bookingId: string, newSeatNumbers: number[]) => {
    const bookingToUpdateIndex = bookings.findIndex(
      (booking) => booking.id === bookingId
    );
    if (bookingToUpdateIndex !== -1) {
      const bookingToUpdate = bookings[bookingToUpdateIndex];
      const movieId = bookingToUpdate.movieId;
      const movie = movies.find((m) => m.id === movieId);

      if (movie) {
        const currentlyBookedInThisBooking = bookingToUpdate.seatNumbers;
        const newlySelectedSeats = newSeatNumbers;

        const seatsToRemove = currentlyBookedInThisBooking.filter(
          (seat) => !newlySelectedSeats.includes(seat)
        );
        const seatsToAdd = newlySelectedSeats.filter(
          (seat) => !currentlyBookedInThisBooking.includes(seat)
        );

        const bookedByOthers = movie.bookedSeats.filter(
          (seat) => !currentlyBookedInThisBooking.includes(seat)
        );
        const areNewSeatsAvailable = seatsToAdd.every(
          (seat) => !bookedByOthers.includes(seat)
        );

        if (areNewSeatsAvailable) {
          const updatedBookings = [...bookings];
          updatedBookings[bookingToUpdateIndex] = {
            ...bookingToUpdate,
            seatNumbers: newlySelectedSeats,
          };
          setBookings(updatedBookings);

          setMovies((prevMovies) =>
            prevMovies.map((m) =>
              m.id === movieId
                ? {
                    ...m,
                    bookedSeats: [
                      ...m.bookedSeats.filter(
                        (seat) => !seatsToRemove.includes(seat)
                      ),
                      ...seatsToAdd,
                    ].sort((a, b) => a - b),
                  }
                : m
            )
          );
        } else {
          alert("Some of the newly selected seats are no longer available.");
        }
      }
    }
  };

  const cancelBooking = (bookingId: string) => {
    const bookingToCancel = bookings.find(
      (booking) => booking.id === bookingId
    );
    if (bookingToCancel) {
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
      setMovies((prevMovies) =>
        prevMovies.map((movie) =>
          movie.id === bookingToCancel.movieId
            ? {
                ...movie,
                bookedSeats: movie.bookedSeats.filter(
                  (seat) => !bookingToCancel.seatNumbers.includes(seat)
                ),
              }
            : movie
        )
      );
    }
  };

  return (
    <BookingContext.Provider
      value={{
        movies,
        bookings,
        bookSeats,
        updateBookingSeats,
        cancelBooking,
        loadingMovies,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};
