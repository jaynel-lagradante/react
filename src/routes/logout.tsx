import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export const Route = createFileRoute("/logout")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLoggingOut(true);
      const logoutDelay = 2000;

      const logoutTimeout = setTimeout(async () => {
        await logout();
        navigate({ to: "/login" });
      }, logoutDelay);

      return () => clearTimeout(logoutTimeout);
    } else {
      navigate({ to: "/login" });
    }
  }, [navigate, logout, isAuthenticated]);

  return (
    <div className="container mx-auto mt-10 max-w-md flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Logging Out...</h2>
      <p className="mb-4 text-gray-600">Please wait a moment.</p>
      {isLoggingOut && (
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      )}
      {isAuthenticated && (
        <div className="mt-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={async () => {
              setIsLoggingOut(true);
              await logout();
              navigate({ to: "/login" });
            }}
            disabled={isLoggingOut}
          >
            Logout Now
          </button>
        </div>
      )}
    </div>
  );
}
