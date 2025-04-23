import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMovieService,
  deleteMovieService,
  getMoviesService,
  updateMovieService,
} from "../services/movieService";
import { v4 as uuidv4 } from "uuid";
import { useMovieStore } from "../store/movieStore";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Movie } from "../types/movie";

export const Route = createFileRoute("/admin")({
  component: AdminPageComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth.user?.type !== "admin") {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function AdminPageComponent() {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Movie</h2>
      <AddMovieForm />
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Movie List</h2>
        <MovieListTable />
      </div>
    </div>
  );
}

function AddMovieForm() {
  const queryClient = useQueryClient();
  const selectedMovie = useMovieStore((state) => state.selectedMovie);
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);
  const form = useForm({
    defaultValues: selectedMovie || {
      // Set default values from selectedMovie
      title: "",
      description: "",
      showtime: "",
      totalSeats: 0,
    },
    onSubmit: async (formData) => {
      if (selectedMovie?.id) {
        await updateMovieMutate({ ...formData.value, id: selectedMovie.id });
      } else {
        const movieDataWithId = {
          ...formData.value,
          id: uuidv4(),
        };
        await createMovieMutate(movieDataWithId);
      }
    },
  });

  const {
    mutate: createMovieMutate,
    isError: isCreateError,
    error: createError,
    isPending: isCreatePending,
  } = useMutation({
    mutationFn: addMovieService,
    onSuccess: () => {
      form.reset();
      setSelectedMovie(null); // Clear selected movie after successful creation
      alert("Movie added successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err) => {
      console.error("Error adding movie:", err);
      alert("Failed to add movie.");
    },
  });

  const {
    mutate: updateMovieMutate,
    isError: isUpdateError,
    error: updateError,
    isPending: isUpdatePending,
  } = useMutation({
    mutationFn: (movie: Movie) => {
      if (!selectedMovie) {
        throw new Error("No movie selected for update.");
      }
      return updateMovieService(selectedMovie, movie);
    },
    onSuccess: () => {
      form.reset();
      setSelectedMovie(null); // Clear selected movie after successful update
      alert("Movie updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err) => {
      console.error("Error updating movie:", err);
      alert("Failed to update movie.");
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="text-xl font-semibold mb-4">
        {selectedMovie ? "Edit Movie" : "Add New Movie"}
      </h2>
      <form.Field name="title">
        {(field) => (
          <div className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={isCreatePending || isUpdatePending}
            />
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500 text-xs italic">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={isCreatePending || isUpdatePending}
            />
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500 text-xs italic">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="showtime">
        {(field) => (
          <div className="mb-4">
            <label
              htmlFor={field.name}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Showtime
            </label>
            <input
              id="showtime"
              type="datetime-local"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={isCreatePending || isUpdatePending}
            />
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500 text-xs italic">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="totalSeats">
        {(field) => (
          <div className="mb-6">
            <label
              htmlFor={field.name}
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Seats
            </label>
            <input
              id="totalSeats"
              type="number"
              value={field.state.value}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={isCreatePending || isUpdatePending}
            />
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500 text-xs italic">
                {field.state.meta.errors[0]}
              </p>
            )}
          </div>
        )}
      </form.Field>

      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
          disabled={isCreatePending || isUpdatePending}
        >
          {isCreatePending
            ? "Adding..."
            : isUpdatePending
              ? "Updating..."
              : selectedMovie
                ? "Update Movie"
                : "Add Movie"}
        </button>
        {(isCreateError || isUpdateError) && (
          <p className="text-red-500 text-xs italic">
            {createError?.message ||
              updateError?.message ||
              "Failed to perform operation."}
          </p>
        )}
        {selectedMovie && (
          <button
            type="button"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              form.reset();
              setSelectedMovie(null);
            }}
            disabled={isCreatePending || isUpdatePending}
          >
            Cancel Edit
          </button>
        )}
      </div>
    </form>
  );
}

function MovieListTable() {
  const queryClient = useQueryClient();
  const setMovies = useMovieStore((state) => state.setMovies);
  const setSelectedMovie = useMovieStore((state) => state.setSelectedMovie);
  const { isLoading, isError, error } = useQuery({
    queryKey: ["movies"],
    queryFn: async () => {
      const response = await getMoviesService();
      setMovies(response);
      return response;
    },
  });

  const movies = useMovieStore((state) => state.movies);

  const { mutate: deleteMovieMutate, isPending: isDeleting } = useMutation({
    mutationFn: deleteMovieService,
    onSuccess: () => {
      alert("Movie deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["movies"] });
    },
    onError: (err) => {
      console.error("Error deleting movie:", err);
      alert("Failed to delete movie.");
    },
  });

  const columns: ColumnDef<Movie>[] = [
    {
      accessorKey: "title",
      header: "Title",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "showtime",
      header: "Showtime",
      cell: (info) => new Date(info.getValue() as string).toLocaleString(),
    },
    {
      accessorKey: "totalSeats",
      header: "Total Seats",
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
            onClick={() => deleteMovieMutate(row.original.id ?? "")}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            onClick={() => setSelectedMovie(row.original)} // Populate Zustand state for editing
            disabled={isDeleting}
          >
            Update
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: movies || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <div>Loading movies...</div>;
  if (isError) return <div>Error loading movies: {error?.message}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="border px-4 py-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
