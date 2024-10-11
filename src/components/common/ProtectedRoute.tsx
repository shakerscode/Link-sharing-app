import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";

const ProtectedRoute = () => {
  const isAuthenticated = useAuth();

  // If the hook is still determining authentication, show a loading indicator or null
  if (isAuthenticated === false) {
    return <div>Loading...</div>; // Replace this with a loading spinner or any loading indicator
  }

  // If the user is not authenticated, navigate to sign-in
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  // If the user is authenticated, render the child components
  return <Outlet />;
};

export default ProtectedRoute;
