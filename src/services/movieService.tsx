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
