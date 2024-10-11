// api.ts

// Define your base API URL (this could be based on an environment variable)
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5001";

// Helper function to get the base URL
export const getBaseUrl = () => BASE_URL;

// Function to create a full API request with a path
export const fetcher = async (path: string, options: RequestInit = {}) => {
  const url = `${getBaseUrl()}${path}`;
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.statusText}`);
  }

  return response.json(); // Assuming your response is in JSON format
};
