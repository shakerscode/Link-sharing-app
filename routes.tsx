import { createBrowserRouter } from "react-router-dom";
import NotFound from "~/NotFound/NotFound";
import SignIn from "~/components/Auth/SignIn";
import SignUp from "~/components/Auth/SignUp";
import Home from "~/components/Home/Home";
import Links from "~/components/Links/Links";
import Preview from "~/components/Preview/Preview";
import ProfileDetails from "~/components/Profile/ProfileDetails";
import ProtectedRoute from "~/components/common/ProtectedRoute";
import MainLayout from "~/layout/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />, // Home page is not protected
      },
      {
        path: "/links",
        element: <ProtectedRoute />, // Wrap with ProtectedRoute
        children: [
          {
            path: "/links",
            element: <Links />,
          },
        ],
      },
      {
        path: "/profile",
        element: <ProtectedRoute />, // Wrap with ProtectedRoute
        children: [
          {
            path: "/profile",
            element: <ProfileDetails />,
          },
        ],
      },
    ],
  },
  {
    path: "/preview",
    element: <ProtectedRoute />, // Wrap with ProtectedRoute
    children: [
      {
        path: "/preview",
        element: <Preview />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />, // NotFound page is not protected
  },
]);
