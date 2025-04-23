import { createFileRoute, redirect } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { addMovieService } from "../services/movieService";
import { v4 as uuidv4 } from "uuid";

export const Route = createFileRoute("/admin")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.auth.user?.type !== "admin") {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      showtime: "",
      totalSeats: 0,
    },
    onSubmit: async (formData) => {
      const movieDataWithId = {
        ...formData.value,
        id: uuidv4(), // Generate a UUID
      };
      mutate(movieDataWithId);
    },
  });

  const { mutate, isError, error, isPending } = useMutation({
    mutationFn: addMovieService,
    onSuccess: () => {
      form.reset();
      alert("Movie added successfully!");
    },
    onError: (err) => {
      console.error("Error adding movie:", err);
      alert("Failed to add movie.");
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add New Movie</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
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
                disabled={isPending} // Disable input while loading
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
                disabled={isPending} // Disable input while loading
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
                disabled={isPending} // Disable input while loading
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
                disabled={isPending} // Disable input while loading
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
            disabled={isPending} // Disable button while loading
          >
            {isPending ? "Adding..." : "Add Movie"}
          </button>
          {isError && (
            <p className="text-red-500 text-xs italic">
              {error?.message || "Failed to add movie."}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
