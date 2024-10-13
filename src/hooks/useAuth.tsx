import { useUserStore } from "~/zustand/store/useUserStore";
import { fetcher } from "~/zustand/api";
import { useQuery } from "react-query";
import { LinkLogo } from "~/assets/icons/LinkLogo";
import Spinner from "~/components/ui/Spinner";
import Cookies from "js-cookie";

export const useAuth = () => {
  const { setAuthenticatedUserDetails, isAuthenticated, setIsAuthenticated } =
    useUserStore();

  // Use React Query to fetch the user profile from the backend
  const { data, error, isLoading } = useQuery(
    "userProfile",
    async () => {
      // Get the frontend token from cookies
      return fetcher("/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
    },
    {
      onSuccess: (data) => {
        setAuthenticatedUserDetails(data);
        setIsAuthenticated(true);
      },
      onError: () => {
        setIsAuthenticated(false);
      },
    }
  );
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
