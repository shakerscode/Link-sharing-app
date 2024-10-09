import { createBrowserRouter } from "react-router-dom";
import NotFound from "~/NotFound/NotFound";
import Links from "~/components/Links/Links";
import ProfileDetails from "~/components/Profile/ProfileDetails";
import MainLayout from "~/layout/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/links",
        element: <Links />,
      },
      {
        path: "/profile",
        element: <ProfileDetails />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
