import { create } from "zustand";
import { Movie } from "../types/movie";

interface MovieState {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
}

export const useMovieStore = create<MovieState>((set) => ({
  movies: [],
  setMovies: (newMovies) => set({ movies: newMovies }),
  selectedMovie: null,
  setSelectedMovie: (movie) => set({ selectedMovie: movie }),
}));
