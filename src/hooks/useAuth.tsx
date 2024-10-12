import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "~/zustand/store/useUserStore";
import { fetcher } from "~/zustand/api";
import { toast } from "react-hot-toast";
import { useQuery } from "react-query";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import Spinner from "~/components/ui/Spinner";

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuthenticatedUserDetails, isAuthenticated, setIsAuthenticated } =
    useUserStore();

  // Use React Query to fetch the user profile from the backend
  const { data, error, isLoading } = useQuery(
    "userProfile",
    async () =>
      fetcher("/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    {
      onSuccess: (data) => {
        setAuthenticatedUserDetails(data);
        setIsAuthenticated(true);
      },
      onError: () => {
        setIsAuthenticated(false);
      },
      retry: false, // Do not retry on error
    }
  );

  // Handle side effects for error and navigation
  useEffect(() => {
    if (error) {
      // toast.error("Failed to fetch user details.");
      setIsAuthenticated(false);
    }
  }, [error, setIsAuthenticated, navigate]);

  // If the query is still loading, return false for `isAuthenticated` to prevent premature access
  if (isLoading) {
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

  // Return the authentication state once the query is done loading
  return isAuthenticated;
};
