import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    // errorElement: <ErrorElement></ErrorElement>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
]);
