// api.ts
import Cookies from "js-cookie";

// Define your base API URL (this could be based on an environment variable)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Helper function to get the base URL
export const getBaseUrl = () => BASE_URL; 

export const fetcher = async (path: string, options: RequestInit = {}) => {
  const url = `${getBaseUrl()}${path}`;

  // Retrieve the frontend token from localStorage or any other method
  const frontendToken = Cookies.get("frontendToken");

  // Add the Authorization header with the frontend token if available
  const headers = {
    ...options.headers,
    Authorization: frontendToken ? `Bearer ${frontendToken}` : "",
  };

  // Set options with the updated headers
  const updatedOptions = {
    ...options,
    headers,
    credentials: "include", // This is most important part in this app for authenticating token by default without sending the token from frontend
  };

  const response = await fetch(url, updatedOptions as RequestInit);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json(); 
};
