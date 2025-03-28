import { useState, useEffect } from "react";
import { Movie } from "../types/movie";

const useFetchMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const mockMovies: Movie[] = [
        {
          id: 1,
          title: "Avengers: Endgame",
          description: "The epic conclusion to the Infinity Saga.",
          totalSeats: 100,
          showtime: "2025-03-28 19:00",
          bookedSeats: [15, 32, 67],
        },
        {
          id: 2,
          title: "Spider-Man: Into the Spider-Verse",
          description: "Miles Morales becomes the Spider-Man of his reality.",
          totalSeats: 75,
          showtime: "2025-03-29 14:30",
          bookedSeats: [5, 10, 22, 45],
        },
        {
          id: 3,
          title: "The Shawshank Redemption",
          description: "Two imprisoned men bond over a number of years.",
          totalSeats: 50,
          showtime: "2025-03-30 21:00",
          bookedSeats: [28, 41],
        },
        {
          id: 4,
          title: "Pulp Fiction",
          description:
            "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
          totalSeats: 85,
          showtime: "2025-03-28 21:30",
          bookedSeats: [7, 19, 35, 58, 72],
        },
        {
          id: 5,
          title: "The Dark Knight",
          description:
            "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          totalSeats: 120,
          showtime: "2025-03-29 11:00",
          bookedSeats: [2, 18, 40, 65, 88, 101],
        },
        {
          id: 6,
          title: "Inception",
          description:
            "A thief who steals corporate secrets through the use of dream-sharing technology is given his inverse task of planting an idea into the mind of a CEO.",
          totalSeats: 60,
          showtime: "2025-03-30 16:45",
          bookedSeats: [12, 30, 51],
        },
        {
          id: 7,
          title: "Fight Club",
          description:
            "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more.",
          totalSeats: 40,
          showtime: "2025-03-31 20:00",
          bookedSeats: [1, 20, 39],
        },
        {
          id: 8,
          title: "The Matrix",
          description:
            "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
          totalSeats: 95,
          showtime: "2025-04-01 13:15",
          bookedSeats: [25, 48, 70, 92],
        },
        {
          id: 9,
          title: "Forrest Gump",
          description:
            "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold through the perspective of an Alabama man named Forrest Gump.",
          totalSeats: 70,
          showtime: "2025-04-01 18:00",
          bookedSeats: [10, 33, 55],
        },
        {
          id: 10,
          title: "The Lord of the Rings: The Fellowship of the Ring",
          description:
            "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
          totalSeats: 110,
          showtime: "2025-04-02 10:30",
          bookedSeats: [30, 50, 75, 90, 105],
        },
      ];

      setMovies(mockMovies);
      setLoading(false);
    }, 1000);
  }, []);

  return { movies, loading };
};

export default useFetchMovies;
