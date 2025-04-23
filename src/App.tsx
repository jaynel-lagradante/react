import { BookingProvider } from "./context/BookingContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

const InnerApp = () => {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />;
};

const App = () => {
  return (
    <AuthProvider>
      <BookingProvider>
        <InnerApp />
      </BookingProvider>
    </AuthProvider>
  );
};

export default App;
