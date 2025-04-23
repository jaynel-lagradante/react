import { Movie } from "../types/movie";
import api from "../utils/axios";

export const addMovieService = async (movie: Movie) => {
  try {
    const response = await api.post("/admin/addMovie", movie);
    console.log("Movie created successfully", response.data);
  } catch (error) {
    console.error("Movie creation faile", error);
    throw error;
  }
};

export const getMoviesService = async (): Promise<Movie[]> => {
  try {
    const response = await api.get("/admin/getMoviesList");
    console.log("Movies fetched successfully", response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch movies", error);
    throw error;
  }
};

export const updateMovieService = async (match: Movie, updates: Movie) => {
  try {
    const response = await api.put(`/admin/updateMovie`, {
      match,
      updates,
    });
    console.log("Movie updated successfully", response.data);
  } catch (error) {
    console.error("Movie update failed", error);
    throw error;
  }
};

export const deleteMovieService = async (movieId: string) => {
  try {
    const response = await api.delete(`/admin/deleteMovie?id=${movieId}`);
    console.log("Movie deleted successfully", response.data);
  } catch (error) {
    console.error("Movie deletion failed", error);
    throw error;
  }
};
