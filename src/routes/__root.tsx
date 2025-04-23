import * as React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import { AuthContextType } from "../context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
type RouterContext = {
  auth: AuthContextType;
};
export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent() {
    return <NotFound />;
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <Header />
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </React.Fragment>
  );
}
