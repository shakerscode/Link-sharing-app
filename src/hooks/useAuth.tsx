import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/zustand/store/useUserStore";
import { fetcher } from "~/zustand/api";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setUserDetails, isAuthenticated, setIsAuthenticated } = useUserStore();

  // Use React Query to fetch the user profile from the backend
  const { data, error, isLoading } = useQuery(
    "userProfile",
    async () =>
      fetcher("/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include credentials (cookies) in request
      }),
    {
      onSuccess: (data) => {
        setUserDetails(data);
        setIsAuthenticated(true);
      },
      onError: () => {
        setIsAuthenticated(false); // Set authentication to false on error
      },
      retry: false, // Do not retry on error
    }
  );

  // Handle side effects for error and navigation
  useEffect(() => {
    if (error) {
      toast.error("Failed to fetch user details.");
      setIsAuthenticated(false);
      navigate("/sign-in"); // Navigate only if there's an error and the query is not loading
    }
  }, [error, setIsAuthenticated, navigate]);

  // If the query is still loading, return false for `isAuthenticated` to prevent premature access
  if (isLoading) {
    return false;
  }

  // Return the authentication state once the query is done loading
  return isAuthenticated;
};
