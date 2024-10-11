import { createBrowserRouter } from "react-router-dom";
import NotFound from "~/NotFound/NotFound";
import SignIn from "~/components/Auth/SignIn";
import SignUp from "~/components/Auth/SignUp";
import Home from "~/components/Home/Home";
import Links from "~/components/Links/Links";
import Preview from "~/components/Preview/Preview";
import ProfileDetails from "~/components/Profile/ProfileDetails";
import MainLayout from "~/layout/MainLayout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
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
    path: "/preview",
    element: <Preview />,
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
    element: <NotFound />,
  },
]);
