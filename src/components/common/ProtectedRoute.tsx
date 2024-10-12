import { Navigate } from "react-router-dom";
import { useAuth } from "~/hooks/useAuth";
import Spinner from "../ui/Spinner";
import { LinkLogo } from "~/assets/icons/LinkLogo";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return (
      <div className="bg-gray-300 mt-5 rounded-3xl h-screen flex items-center justify-center w-full flex-col">
        <div className="text-violet-500">
          <LinkLogo size={60} />
        </div>
        <div className="flex gap-2 items-center">
          <Spinner /> Site is loading...
        </div>
      </div>
    );
  }

  // If the user is not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // If the user is authenticated, render the child components
  return <>{children}</>;
};

export default ProtectedRoute;
